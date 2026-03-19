<template>
  <div class="plugin-marketplace">
    <header class="marketplace-header">
      <h1 class="header-title">插件市场</h1>
      <p class="header-subtitle">
        发现由
        <a href="https://github.com/fastapi-practices/plugins" target="_blank">fastapi-practices/plugins</a>
        维护的插件，扩展你的应用能力
      </p>
      <div class="header-actions">
        <a href="/fastapi_best_architecture_docs/plugin/dev" class="action-link">创建插件</a>
        <a href="https://github.com/fastapi-practices/plugins/issues" target="_blank" class="action-link">申请插件</a>
        <a href="/fastapi_best_architecture_docs/plugin/share" class="action-link">发布插件</a>
      </div>
    </header>

    <div class="marketplace-controls">
      <div class="search-wrapper">
        <svg
            class="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <path
              d="M11.5 3.5l1.15 2.85 2.85 1.15-2.85 1.15-1.15 2.85-1.15-2.85-2.85-1.15 2.85-1.15L11.5 3.5z"
          ></path>
          <path
              d="M18.3 11.8l.72 1.78 1.78.72-1.78.72-.72 1.78-.72-1.78-1.78-.72 1.78-.72.72-1.78z"
          ></path>
          <path
              d="M6.2 13.4l.92 2.28 2.28.92-2.28.92-0.92 2.28-.92-2.28-2.28-.92 2.28-.92.92-2.28z"
          ></path>
        </svg>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="让 AI 帮你找插件：名称、作者、描述或仓库名..."
            class="search-input"
        />
      </div>

      <div class="filter-tabs">
        <button
            class="filter-tab"
            :class="{ active: currentTag === 'all' }"
            @click="currentTag = 'all'"
        >
          全部
        </button>
        <button
            v-for="tag in filteredValidTags"
            :key="tag"
            class="filter-tab"
            :class="{ active: currentTag === tag }"
            @click="currentTag = tag"
        >
          {{ getTagLabel(tag) }}
        </button>
      </div>
    </div>

    <div class="marketplace-content">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <span>正在加载插件列表...</span>
      </div>

      <div v-else-if="error" class="error-state">
        <span>{{ error }}</span>
        <button @click="fetchPlugins" class="retry-btn">重试</button>
      </div>

      <div v-else-if="filteredPlugins.length === 0" class="empty-state">
        <span>未找到匹配的插件</span>
        <button @click="resetFilters" class="reset-btn">清除筛选</button>
      </div>

      <div v-else class="plugin-grid">
        <article
            v-for="plugin in filteredPlugins"
            :key="plugin.git.path"
            class="plugin-card"
            :class="`plugin-card-${getPluginType(plugin.git.path)}`"
        >
          <div class="card-top">
            <a
                :href="plugin.git.url"
                target="_blank"
                rel="noreferrer"
                class="card-main-link card-main-link-top"
            >
              <div class="card-icon" :class="`card-icon-${getPluginType(plugin.git.path)}`">
                <img
                    v-if="plugin.plugin.icon && !failedIcons.has(plugin.git.path)"
                    :src="plugin.plugin.icon"
                    :alt="plugin.plugin.summary"
                    @error="failedIcons.add(plugin.git.path)"
                />
                <div v-else class="icon-fallback" :style="{ background: getColor(plugin.git.path) }">
                  {{ getInitial(plugin.git.path) }}
                </div>
              </div>
              <div class="card-meta">
                <div class="card-header">
                  <span class="card-title">{{ plugin.plugin.summary }}</span>
                  <span class="card-version">v{{ plugin.plugin.version }}</span>
                </div>
                <p class="card-author">{{ plugin.plugin.author }} / {{ getName(plugin.git.path) }}</p>
              </div>
            </a>
          </div>

          <a
              :href="plugin.git.url"
              target="_blank"
              rel="noreferrer"
              class="card-main-link card-main-link-body"
          >
            <p class="card-desc">{{ plugin.plugin.description }}</p>
            <div class="card-tags"
                 v-if="getValidDatabases(plugin.plugin.database).length || getValidTags(plugin.plugin.tags).length">
              <span v-for="db in getValidDatabases(plugin.plugin.database)" :key="'db-' + db"
                    class="tag">#{{ getDbLabel(db) }}</span>
              <span v-for="tag in getValidTags(plugin.plugin.tags).slice(0, 3)" :key="tag"
                    class="tag">#{{ getTagLabel(tag) }}</span>
            </div>
          </a>

          <div class="card-footer-actions">
            <a
                :href="getInstallUrl(plugin.git.path)"
                class="card-action-btn card-action-install"
            >
              <svg class="card-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   aria-hidden="true">
                <path d="M12 3v12"></path>
                <path d="M7 10l5 5 5-5"></path>
                <path d="M5 21h14"></path>
              </svg>
              <span>安装</span>
            </a>

            <a
                :href="getStarUrl(plugin.git.url)"
                target="_blank"
                rel="noreferrer"
                class="card-action-btn card-action-like"
            >
              <svg class="card-action-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                    d="M12 3.75l2.56 5.19 5.73.83-4.14 4.04.98 5.7L12 16.78l-5.13 2.73.98-5.7-4.14-4.04 5.73-.83L12 3.75z"></path>
              </svg>
              <span>{{ getStarLabel(plugin) }}</span>
            </a>

            <button
                type="button"
                class="card-action-btn card-action-share"
                :class="{ copied: copiedPluginPath === plugin.git.path }"
                :aria-label="copiedPluginPath === plugin.git.path ? '已复制' : '分享'"
                :title="copiedPluginPath === plugin.git.path ? '已复制' : '分享'"
                @click="sharePlugin(plugin)"
            >
              <svg class="card-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   aria-hidden="true">
                <path d="M8.59 13.51l6.83 3.98"></path>
                <path d="M15.41 6.51L8.59 10.49"></path>
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
              </svg>
              <span>{{ copiedPluginPath === plugin.git.path ? '已复制' : '分享' }}</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue'

type PluginType = 'backend' | 'frontend'

interface PluginItem {
  git: {
    path: string
    url: string
  }
  plugin: {
    icon?: string
    summary: string
    version: string
    author: string
    description: string
    database?: string[]
    tags?: string[]
  }
}

// Data sync from: https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/backend/plugin/validator.py
const TAG_LABELS: Record<string, string> = {
  ai: 'AI',
  mcp: 'MCP',
  agent: 'Agent',
  auth: '认证',
  storage: '存储',
  notification: '通知',
  task: '任务',
  payment: '支付',
  other: '其他'
}

const DB_TABLES: Record<string, string> = {
  mysql: 'MySQL',
  postgresql: 'PostgreSQL'
}

const CACHE_KEY = 'fba_plugins_cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000
const STAR_CACHE_KEY = 'fba_plugins_stars_cache'
const STAR_CACHE_DURATION = 24 * 60 * 60 * 1000
const FRONTEND_REPO_SUFFIX = '_ui'
const INSTALL_DOC_BASE = '/fastapi_best_architecture_docs/plugin/install'

const DATA_SOURCES = [
  'https://raw.githubusercontent.com/fastapi-practices/plugins/refs/heads/master/plugins-data.ts',
  'https://fastly.jsdelivr.net/gh/fastapi-practices/plugins@master/plugins-data.ts',
  'https://cdn.jsdelivr.net/gh/fastapi-practices/plugins@master/plugins-data.ts'
]

const loading = ref(true)
const error = ref('')
const plugins = ref<PluginItem[]>([])
const validTags = ref<string[]>([])
const currentTag = ref('all')
const searchQuery = ref('')
const failedIcons = reactive(new Set<string>())
const starCounts = reactive<Record<string, number>>({})
const copiedPluginPath = ref('')
const { copy: copyToClipboard } = useClipboard({ legacy: true })
let copiedTimer: ReturnType<typeof setTimeout> | null = null

const filteredPlugins = computed(() => {
  let result = plugins.value

  if (currentTag.value !== 'all') {
    result = result.filter(p => p.plugin?.tags?.includes(currentTag.value))
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(p =>
        p.plugin?.summary?.toLowerCase().includes(query) ||
        p.plugin?.description?.toLowerCase().includes(query) ||
        p.plugin?.author?.toLowerCase().includes(query) ||
        p.git?.path?.toLowerCase().includes(query)
    )
  }

  return result
})

const getName = (path: string): string => {
  if (!path) return 'unknown'
  const parts = path.split('/')
  return parts[parts.length - 1] || 'unknown'
}

const getInitial = (path: string): string => {
  return getName(path).charAt(0).toUpperCase()
}

const getPluginType = (path: string): PluginType => {
  return getName(path).endsWith(FRONTEND_REPO_SUFFIX) ? 'frontend' : 'backend'
}

const getInstallUrl = (path: string): string => {
  return `${ INSTALL_DOC_BASE }${ getPluginType(path) === 'frontend' ? '#前端' : '#后端' }`
}

const getRepoFullName = (url: string): string => {
  const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/i)
  if (!match) return ''
  return `${ match[1] }/${ match[2].replace(/\.git$/i, '') }`
}

const getStarUrl = (url: string): string => {
  const repo = getRepoFullName(url)
  return repo ? `https://github.com/${ repo }/stargazers` : url
}

const formatStarCount = (count: number): string => {
  if (count >= 1000000) return `${ (count / 1000000).toFixed(1).replace(/\.0$/, '') }M`
  if (count >= 1000) return `${ (count / 1000).toFixed(1).replace(/\.0$/, '') }k`
  return String(count)
}

const getStarLabel = (plugin: PluginItem): string => {
  const repo = getRepoFullName(plugin.git.url)
  const count = starCounts[repo]
  return typeof count === 'number' ? formatStarCount(count) : '点赞'
}

const buildShareText = (plugin: PluginItem): string => {
  const summary = plugin.plugin.summary.trim()
  const description = plugin.plugin.description?.replace(/\s+/g, ' ').trim()

  return [
    `发现一个不错的 fba 插件「${ summary }」`,
    description || '值得放进你的项目里试一试。',
    `仓库地址：${ plugin.git.url }`
  ].join('\n')
}

const sharePlugin = async (plugin: PluginItem) => {
  try {
    await copyToClipboard(buildShareText(plugin))
    copiedPluginPath.value = plugin.git.path

    if (copiedTimer) clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => {
      copiedPluginPath.value = ''
      copiedTimer = null
    }, 1800)
  } catch (e) {
    console.warn('Share copy failed:', e)
  }
}

const getColor = (str: string): string => {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6']
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

const getTagLabel = (tag: string): string => {
  return TAG_LABELS[tag] || tag
}

const getDbLabel = (db: string): string => {
  return DB_TABLES[db] || db
}

const filteredValidTags = computed(() => {
  return validTags.value.filter(tag => tag in TAG_LABELS)
})

const getValidTags = (tags: string[] | undefined): string[] => {
  if (!tags) return []
  return tags.filter(tag => tag in TAG_LABELS)
}

const getValidDatabases = (databases: string[] | undefined): string[] => {
  if (!databases) return []
  return databases.filter(db => db in DB_TABLES)
}

const resetFilters = () => {
  searchQuery.value = ''
  currentTag.value = 'all'
}

const loadStarCache = (): Record<string, { count: number, timestamp: number }> => {
  try {
    const cached = localStorage.getItem(STAR_CACHE_KEY)
    return cached ? JSON.parse(cached) : {}
  } catch (e) {
    console.warn('Star cache read error:', e)
    return {}
  }
}

const saveStarCache = (cache: Record<string, { count: number, timestamp: number }>) => {
  try {
    localStorage.setItem(STAR_CACHE_KEY, JSON.stringify(cache))
  } catch (e) {
    console.warn('Star cache write error:', e)
  }
}

const syncPluginStars = async (pluginList: PluginItem[]) => {
  const now = Date.now()
  const starCache = loadStarCache()
  const repoNames = Array.from(new Set(pluginList.map(plugin => getRepoFullName(plugin.git.url)).filter(Boolean)))

  repoNames.forEach(repo => {
    const cached = starCache[repo]
    if (cached) {
      starCounts[repo] = cached.count
    }
  })

  for (const repo of repoNames) {
    const cached = starCache[repo]
    if (cached && now - cached.timestamp < STAR_CACHE_DURATION) continue

    try {
      const response = await fetch(`https://api.github.com/repos/${ repo }`, {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      })

      if (!response.ok) {
        if (response.status === 403 || response.status === 429) break
        continue
      }

      const data = await response.json()
      if (typeof data.stargazers_count === 'number') {
        starCounts[repo] = data.stargazers_count
        starCache[repo] = {
          count: data.stargazers_count,
          timestamp: Date.now()
        }
      }
    } catch (e) {
      console.warn(`Failed to fetch stars for ${ repo }:`, e)
    }
  }

  saveStarCache(starCache)
}

const parseTypeScriptData = (text: string): { tags: string[], plugins: PluginItem[] } => {
  const tags: string[] = []
  const pluginList: PluginItem[] = []

  const tagsMatch = text.match(/export\s+const\s+validTags\s*=\s*\[([\s\S]*?)\]\s*as\s+const/)
  if (tagsMatch) {
    const tagMatches = tagsMatch[1].match(/"([^"]+)"/g)
    if (tagMatches) {
      tagMatches.forEach(t => tags.push(t.replace(/"/g, '')))
    }
  }

  const pluginsMatch = text.match(/export\s+const\s+pluginDataList[\s\S]*?=\s*(\[[\s\S]*\])/)
  if (pluginsMatch) {
    try {
      const jsonStr = pluginsMatch[1].replace(/,(\s*[}\]])/g, '$1')
      const parsed = JSON.parse(jsonStr)
      if (Array.isArray(parsed)) {
        pluginList.push(...parsed)
      }
    } catch (e) {
      console.error('JSON parse error:', e)
    }
  }

  return { tags, plugins: pluginList }
}

const loadFromCache = (): { tags: string[], plugins: PluginItem[] } | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data
      }
    }
  } catch (e) {
    console.warn('Cache read error:', e)
  }
  return null
}

const saveToCache = (data: { tags: string[], plugins: PluginItem[] }) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.warn('Cache write error:', e)
  }
}

const fetchWithFallback = async (): Promise<string> => {
  for (const url of DATA_SOURCES) {
    try {
      const response = await fetch(url, { cache: 'no-cache' })
      if (response.ok) {
        return await response.text()
      }
    } catch (e) {
      console.warn(`Failed to fetch from ${ url }:`, e)
    }
  }
  throw new Error('All data sources failed')
}

const fetchPlugins = async () => {
  loading.value = true
  error.value = ''

  const cached = loadFromCache()
  if (cached) {
    validTags.value = cached.tags
    plugins.value = cached.plugins
    syncPluginStars(cached.plugins)
    loading.value = false

    fetchWithFallback()
    .then(text => {
      const data = parseTypeScriptData(text)
      validTags.value = data.tags
      plugins.value = data.plugins
      saveToCache(data)
      syncPluginStars(data.plugins)
    })
    .catch(() => {
    })
    return
  }

  try {
    const text = await fetchWithFallback()
    const data = parseTypeScriptData(text)
    validTags.value = data.tags
    plugins.value = data.plugins
    saveToCache(data)
    syncPluginStars(data.plugins)
  } catch (e) {
    console.error('Fetch error:', e)
    error.value = '加载失败，请检查网络连接'
  } finally {
    loading.value = false
  }
}

onMounted(fetchPlugins)

onBeforeUnmount(() => {
  if (copiedTimer) clearTimeout(copiedTimer)
})
</script>

<style scoped>
.plugin-marketplace {
  --backend-accent: var(--vp-c-brand-1);
  --backend-soft: var(--vp-c-brand-soft);
  --frontend-accent: #7c3aed;
  --frontend-soft: rgba(124, 58, 237, 0.12);
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px;
}

.marketplace-header {
  text-align: center;
  margin-bottom: 24px;
}

.header-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
}

.header-subtitle {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.header-subtitle a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.header-subtitle a:hover {
  text-decoration: underline;
}

.header-actions {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}

.action-link {
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 4px;
  transition: all 0.15s;
}

.action-link:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.marketplace-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 0 14px 0 42px;
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.filter-tab {
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.filter-tab.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

.marketplace-content {
  min-height: 300px;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 20px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.retry-btn,
.reset-btn {
  padding: 6px 16px;
  font-size: 13px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover,
.reset-btn:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.plugin-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .plugin-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .plugin-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .plugin-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.plugin-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 18px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.card-main-link {
  display: flex;
  flex: 1;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
}

.card-main-link-top {
  flex-direction: row;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}

.card-main-link-body {
  flex: 1;
}

.plugin-card:hover {
  background: var(--vp-c-bg);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
}

.plugin-card-backend {
  border-color: color-mix(in srgb, var(--backend-accent) 10%, var(--vp-c-divider));
  background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--backend-accent) 4%, transparent),
      transparent 78px
  ),
  var(--vp-c-bg-soft);
}

.plugin-card-backend:hover {
  border-color: color-mix(in srgb, var(--backend-accent) 18%, var(--vp-c-divider));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
}

.plugin-card-frontend {
  border-color: color-mix(in srgb, var(--frontend-accent) 12%, var(--vp-c-divider));
  background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--frontend-accent) 8%, transparent),
      transparent 58%
  ),
  var(--vp-c-bg-soft);
}

.plugin-card-frontend:hover {
  border-color: color-mix(in srgb, var(--frontend-accent) 18%, var(--vp-c-divider));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
}

.card-top {
  margin-bottom: 12px;
}

.card-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.card-icon-backend {
  background: linear-gradient(180deg, color-mix(in srgb, var(--backend-accent) 10%, transparent), transparent), var(--vp-c-bg);
}

.card-icon-frontend {
  background: linear-gradient(180deg, color-mix(in srgb, var(--frontend-accent) 14%, transparent), transparent), var(--vp-c-bg);
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 6px;
}

.icon-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.card-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.card-version {
  font-size: 11px;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.card-author {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 6px 0 0;
  line-height: 1.2;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
  padding-top: 10px;
}

.card-footer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
}

.card-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 0;
  padding: 5px 9px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.1;
  color: var(--vp-c-text-2);
  background: color-mix(in srgb, var(--vp-c-bg) 50%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 88%, transparent);
  border-radius: 7px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-action-btn:hover {
  color: var(--vp-c-text-1);
}

.card-action-like:hover {
  border-color: color-mix(in srgb, var(--backend-accent) 24%, var(--vp-c-divider));
  color: var(--backend-accent);
}

.card-action-share:hover,
.card-action-share.copied {
  border-color: color-mix(in srgb, var(--frontend-accent) 24%, var(--vp-c-divider));
  color: var(--frontend-accent);
}

.card-action-install:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 24%, var(--vp-c-divider));
  color: var(--vp-c-brand-1);
}

.card-action-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.tag {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

@media (max-width: 768px) {
  .plugin-marketplace {
    padding: 36px 18px;
  }

  .header-actions {
    flex-wrap: wrap;
    gap: 12px;
  }

  .card-author {
    white-space: normal;
  }

  .card-footer-actions {
    margin-top: 10px;
  }
}
</style>
