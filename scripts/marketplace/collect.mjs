#!/usr/bin/env node
// 插件市场数据采集
//
// 数据来源：
//   1. 官方插件仓库 fastapi-practices/plugins（PR 合入方式收录）
//   2. GitHub 上带有 fba-plugin 标签或同名主题的仓库（无需 PR 即可收录）
//
// 采集结果输出为 plugins-market.json，供站点运行时读取
import { writeFile, readFile } from 'node:fs/promises'
import { parse as parseToml } from 'smol-toml'
import { GitHubClient } from './github.mjs'
import {
  LIMITS,
  MARKERS,
  OUTPUT_FILE,
  RAW_BASE,
  REGISTRY_BRANCH,
  REGISTRY_REPO,
  STATE_FILE,
} from './config.mjs'

const VALID_TAGS = [
  'ai',
  'mcp',
  'agent',
  'auth',
  'storage',
  'notification',
  'task',
  'payment',
  'other',
]

// 通过代码检索发现社区插件仓库
// 检索式覆盖 fba 插件清单的共同特征，命中即为候选，再逐一核对标记
// 检索结果只保留仓库根目录下的 plugin.toml，显著减少无关候选
const CODE_SEARCH_QUERIES = [
  'filename:plugin.toml fba_version',
  'filename:plugin.toml router',
  'filename:plugin.toml depends_on',
  'filename:plugin.toml summary author',
]

// 每个检索式翻页数上限，避免过多消耗搜索接口配额
const CODE_SEARCH_PAGES = 2

const [REGISTRY_OWNER, REGISTRY_NAME] = REGISTRY_REPO.split('/')

// 读取官方插件仓库的既有数据
async function loadRegistry(client) {
  const text = await client.rawFile(REGISTRY_OWNER, REGISTRY_NAME, 'plugins-data.json', REGISTRY_BRANCH)
  if (!text) return { validTags: VALID_TAGS, pluginDataList: [] }

  try {
    const data = JSON.parse(text)
    return {
      validTags: Array.isArray(data?.validTags) && data.validTags.length ? data.validTags : VALID_TAGS,
      pluginDataList: Array.isArray(data?.pluginDataList) ? data.pluginDataList : [],
    }
  } catch {
    return { validTags: VALID_TAGS, pluginDataList: [] }
  }
}

// 从 plugin.toml 中提取插件信息
export function parsePluginToml(content, { owner, repo, branch, path }) {
  if (!content) return null

  let config
  try {
    config = parseToml(content)
  } catch {
    return null
  }

  const plugin = config?.plugin
  if (!plugin || typeof plugin !== 'object') return null

  const summary = typeof plugin.summary === 'string' ? plugin.summary.trim() : ''
  const description = typeof plugin.description === 'string' ? plugin.description.trim() : ''
  const author = typeof plugin.author === 'string' ? plugin.author.trim() : ''
  const version = typeof plugin.version === 'string' ? plugin.version.trim() : ''

  // 关键信息缺失或版本号不合法的仓库不予收录
  if (!summary || !description || !author || !version) return null
  if (!/^\d+\.\d+\.\d+$/.test(version)) return null

  const tags = Array.isArray(plugin.tags)
    ? [...new Set(plugin.tags.map((tag) => String(tag).toLowerCase()).filter((tag) => VALID_TAGS.includes(tag)))]
    : []

  let icon = typeof plugin.icon === 'string' ? plugin.icon.trim() : ''
  // 相对路径的图标统一转为 raw 地址，避免浏览器端路径解析差异
  if (icon && !/^https?:\/\//.test(icon)) {
    icon = `${RAW_BASE}/${owner}/${repo}/${branch}/${icon.replace(/^\/+/, '')}`
  }

  return {
    plugin: {
      ...(icon ? { icon } : {}),
      summary,
      version,
      description,
      author,
      ...(tags.length ? { tags } : {}),
    },
    git: {
      path,
      url: `https://github.com/${owner}/${repo}.git`,
      branch,
    },
  }
}

// 提取仓库许可证，没有许可证时返回 null
function getLicense(info) {
  const spdx = info?.license?.spdx_id
  if (typeof spdx !== 'string') return null
  if (!spdx || spdx === 'NOASSERTION' || spdx === 'null') return null
  return spdx
}

// 裁剪 ETag 缓存，避免状态文件无限膨胀
// 对象键的插入顺序即写入顺序，超出体积上限时优先丢弃最早写入的缓存
function pruneState(state, maxBytes = 512 * 1024) {
  const bodies = state.etagBodies
  if (!bodies || typeof bodies !== 'object') return

  const drop = (key) => {
    delete bodies[key]
    if (state.etags) delete state.etags[key]
    if (state.rawKeys) delete state.rawKeys[key]
  }

  // 只保留核心接口的缓存，检索类响应体积大且不再缓存
  for (const key of Object.keys(bodies)) {
    if (!key.startsWith('core:')) drop(key)
  }

  let total = 0
  for (const key of Object.keys(bodies)) {
    total += (bodies[key] || '').length
  }

  for (const key of Object.keys(bodies)) {
    if (total <= maxBytes) break
    const size = (bodies[key] || '').length
    drop(key)
    total -= size
  }
}

// 记录插件首次被收录的时间，作为其上架时间
export function firstSeenAt(state, key) {
  state.discoveredAt = state.discoveredAt || {}
  if (!state.discoveredAt[key]) {
    state.discoveredAt[key] = new Date().toISOString()
  }
  return state.discoveredAt[key]
}

// 判断仓库是否带有插件标记（标签或主题）
// 标签名统一按小写比较，`FBA-Plugin` 与 `fba-plugin` 视为同一个标记
export function hasMarker(labels, topics) {
  const names = new Set(
    [...(Array.isArray(labels) ? labels : []), ...(Array.isArray(topics) ? topics : [])]
      .map((name) => String(name || '').trim().toLowerCase())
      .filter(Boolean),
  )
  return MARKERS.some((marker) => names.has(marker))
}

// 收集带有插件标记的社区仓库
export async function discoverMarkedRepos(client) {
  const candidates = new Map()

  // 主题检索：仓库搜索中唯一可靠的标记检索方式
  for (const marker of MARKERS) {
    const items = await client.searchByTopic(marker)
    for (const item of items) {
      if (item?.full_name) candidates.set(item.full_name, item)
    }
  }

  // 代码检索：补充设置了标签但未设置主题的仓库
  for (const query of CODE_SEARCH_QUERIES) {
    for (let page = 1; page <= CODE_SEARCH_PAGES; page += 1) {
      const items = await client.searchCode(query, page)
      if (!items.length) break
      for (const item of items) {
        const fullName = item?.repository?.full_name
        if (fullName && !candidates.has(fullName)) candidates.set(fullName, item)
      }
    }
  }

  const marked = []
  let checked = 0
  for (const [fullName, item] of candidates) {
    // 候选数量有上限，避免单轮核对过多仓库拖垮配额
    if (checked >= LIMITS.maxCandidates) break
    checked += 1
    const [owner, repo] = fullName.split('/')
    if (!owner || !repo) continue

    // 官方插件仓库自身不是插件，跳过
    if (owner === REGISTRY_OWNER && repo === REGISTRY_NAME) continue

    const labels = await client.repoLabels(owner, repo)
    const topics = Array.isArray(item?.topics)
      ? item.topics.map((t) => String(t).toLowerCase())
      : await client.repoTopics(owner, repo)

    if (!hasMarker(labels, topics)) continue

    marked.push({ owner, repo })
  }

  return marked
}

// 采集单个仓库的插件信息
export async function collectRepoPlugin(client, { owner, repo }) {
  const info = await client.repo(owner, repo)
  if (!info) return null
  if (info.archived || info.disabled) return null

  const branch = info.default_branch || 'master'
  const content = await client.rawFile(owner, repo, 'plugin.toml', branch)
  // 标签收录的仓库不占用官方仓库的 plugins/ 路径，避免与同名插件冲突
  const parsed = parsePluginToml(content, {
    owner,
    repo,
    branch,
    path: `marked/${owner}/${repo}`,
  })
  if (!parsed) return null

  return {
    ...parsed,
    stats: {
      stars: Number(info.stargazers_count) || 0,
      forks: Number(info.forks_count) || 0,
      watchers: Number(info.subscribers_count) || 0,
      license: getLicense(info),
      updatedAt: typeof info.pushed_at === 'string' ? info.pushed_at : null,
    },
  }
}

async function main() {
  const state = await readFile(STATE_FILE, 'utf-8')
    .then((text) => JSON.parse(text))
    .catch(() => ({ etags: {} }))

  const client = new GitHubClient({ state })
  const registry = await loadRegistry(client)

  const plugins = []
  const seen = new Set()

  // 1. 官方插件仓库收录的插件
  for (const entry of registry.pluginDataList) {
    const url = entry?.git?.url || ''
    const match = url.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/i)
    if (!match) continue
    const [, owner, repo] = match
    const key = `${owner}/${repo}`
    if (seen.has(key)) continue
    seen.add(key)

    const info = await client.repo(owner, repo)
    // 官方仓库中该路径首次出现的提交时间，即插件的上架时间
    const listedAt = await client.firstCommitDate(
      REGISTRY_OWNER,
      REGISTRY_NAME,
      entry?.git?.path || '',
    )

    plugins.push({
      plugin: entry.plugin,
      git: entry.git,
      source: 'registry',
      stats: {
        stars: Number(info?.stargazers_count) || 0,
        forks: Number(info?.forks_count) || 0,
        watchers: Number(info?.subscribers_count) || 0,
        license: getLicense(info),
        updatedAt: typeof info?.pushed_at === 'string' ? info.pushed_at : null,
        listedAt,
      },
    })
  }

  // 2. 带有插件标记的社区仓库，无需 PR 即可收录
  const marked = await discoverMarkedRepos(client)
  for (const item of marked) {
    const key = `${item.owner}/${item.repo}`
    if (seen.has(key)) continue

    const collected = await collectRepoPlugin(client, item)
    if (!collected) continue
    seen.add(key)

    plugins.push({
      plugin: collected.plugin,
      git: collected.git,
      source: 'marked',
      stats: {
        ...collected.stats,
        listedAt: firstSeenAt(state, key),
      },
    })
  }

  const output = {
    generatedAt: new Date().toISOString(),
    validTags: registry.validTags,
    plugins,
  }

  pruneState(state)

  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, 'utf-8')
  await writeFile(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf-8')

  console.log(`collected ${plugins.length} plugins`)
}

// 直接执行时采集，作为模块导入时不触发
const isDirectRun = process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())

if (isDirectRun) {
  main().catch((error) => {
    console.error('collect failed:', error?.message || error)
    process.exit(1)
  })
}
