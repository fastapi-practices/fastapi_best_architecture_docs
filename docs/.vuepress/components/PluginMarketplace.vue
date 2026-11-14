<template>
  <div class="plugin-marketplace">
    <header class="marketplace-header">
      <h1 class="header-title">{{ t('marketplace.title') }}</h1>
      <p class="header-subtitle">
        {{ t('marketplace.subtitleBefore') }}
        <a href="https://github.com/fastapi-practices/plugins" target="_blank">fastapi-practices/plugins</a>
        {{ t('marketplace.subtitleAfter') }}
      </p>
      <div class="header-actions">
        <a href="https://github.com/fastapi-practices/plugins/issues" target="_blank" class="action-link">{{ t('marketplace.request') }}</a>
        <a :href="withBase(withLocale('/plugin/dev'))" class="action-link">{{ t('marketplace.develop') }}</a>
        <a :href="withBase(withLocale('/plugin/share'))" class="action-link">{{ t('marketplace.publish') }}</a>
        <a :href="withBase(withLocale('/plugin/install'))" class="action-link">{{ t('marketplace.installPlugin') }}</a>
      </div>
    </header>

    <div class="marketplace-controls">
      <div class="search-wrapper">
        <div class="search-field">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M11.5 3.5l1.15 2.85 2.85 1.15-2.85 1.15-1.15 2.85-1.15-2.85-2.85-1.15 2.85-1.15L11.5 3.5z"></path>
            <path d="M18.3 11.8l.72 1.78 1.78.72-1.78.72-.72 1.78-.72-1.78-1.78-.72 1.78-.72.72-1.78z"></path>
            <path d="M6.2 13.4l.92 2.28 2.28.92-2.28.92-0.92 2.28-.92-2.28-2.28-.92 2.28-.92.92-2.28z"></path>
          </svg>
          <input v-model="searchQuery" type="text" :placeholder="t('marketplace.searchPlaceholder')" class="search-input" />
        </div>

        <div class="filter-selects">
          <label class="filter-select-field">
            <span class="filter-label">{{ t('marketplace.maintainerFilter') }}</span>
            <select v-model="currentMaintainer" class="filter-select">
              <option value="all">{{ t('marketplace.all') }}</option>
              <option v-for="maintainer in pluginMaintainers" :key="maintainer" :value="maintainer">
                {{ getMaintainerFilterLabel(maintainer) }}
              </option>
            </select>
          </label>
          <label class="filter-select-field">
            <span class="filter-label">{{ t('marketplace.typeFilter') }}</span>
            <select v-model="currentType" class="filter-select">
              <option value="all">{{ t('marketplace.all') }}</option>
              <option v-for="type in pluginTypes" :key="type" :value="type">
                {{ getTypeFilterLabel(type) }}
              </option>
            </select>
          </label>
          <label class="filter-select-field">
            <span class="filter-label">{{ t('marketplace.tagFilter') }}</span>
            <select v-model="currentTag" class="filter-select">
              <option value="all">{{ t('marketplace.all') }}</option>
              <option v-for="tag in filteredValidTags" :key="tag" :value="tag">
                {{ getTagLabel(tag) }}
              </option>
            </select>
          </label>
          <label class="filter-select-field">
            <span class="filter-label">{{ t('marketplace.sortFilter') }}</span>
            <select v-model="currentSort" class="filter-select">
              <option value="name">{{ t('marketplace.sortName') }}</option>
              <option value="updated" :disabled="!hasTimeStats">{{ t('marketplace.sortUpdated') }}</option>
              <option value="listed" :disabled="!hasTimeStats">{{ t('marketplace.sortListed') }}</option>
            </select>
          </label>
          <label class="filter-select-field">
            <span class="filter-label">{{ t('marketplace.collectFilter') }}</span>
            <select v-model="currentCollect" class="filter-select">
              <option value="all">{{ t('marketplace.all') }}</option>
              <option value="registry">{{ t('marketplace.collectRegistry') }}</option>
              <option value="marked">{{ t('marketplace.collectMarked') }}</option>
            </select>
          </label>
        </div>
      </div>
    </div>

    <div class="marketplace-content">
      <div v-if="loading || !pinyinReady" class="loading-state">
        <div class="loading-spinner"></div>
        <span>{{ t('marketplace.loading') }}</span>
      </div>

      <div v-else-if="error" class="error-state">
        <span>{{ error }}</span>
        <button @click="fetchPlugins" class="retry-btn">{{ t('marketplace.retry') }}</button>
      </div>

      <div v-else-if="filteredPlugins.length === 0" class="empty-state">
        <span>{{ t('marketplace.empty') }}</span>
        <button @click="resetFilters" class="reset-btn">{{ t('marketplace.clearFilters') }}</button>
      </div>

      <div v-else class="plugin-grid">
        <article v-for="plugin in filteredPlugins" :key="plugin.git.path" class="plugin-card"
          :class="`plugin-card-${getPluginType(plugin.git.path)}`">
          <div class="card-top">
            <a :href="plugin.git.url" target="_blank" rel="noreferrer" class="card-main-link card-main-link-top">
              <div class="card-icon" :class="`card-icon-${getPluginType(plugin.git.path)}`">
                <img v-if="plugin.plugin.icon && !failedIcons.has(plugin.git.path)" :src="plugin.plugin.icon"
                  :alt="plugin.plugin.summary" @error="failedIcons.add(plugin.git.path)" />
                <div v-else class="icon-fallback" :style="{ background: getColor(plugin.git.path) }">
                  {{ getInitial(plugin.git.path) }}
                </div>
              </div>
              <div class="card-meta">
                <div class="card-header">
                  <span class="card-title">{{ plugin.plugin.summary }}</span>
                  <span v-if="plugin.source === 'marked'" class="card-source-badge">
                    {{ t('marketplace.collectMarked') }}
                  </span>
                </div>
                <p class="card-author">
                  <span class="card-author-name">{{ plugin.plugin.author }}</span>
                  <span class="card-author-sep"> / </span>
                  <span class="card-author-repo">{{ getRepoName(plugin.git.path) }}</span>
                </p>
              </div>
            </a>
          </div>

          <a :href="plugin.git.url" target="_blank" rel="noreferrer" class="card-main-link card-main-link-body">
            <div class="card-tags">
              <span v-for="tag in getValidTags(plugin.plugin.tags).slice(0, 3)" :key="tag"
                class="tag">{{ getTagLabel(tag) }}</span>
              <span v-if="!getValidTags(plugin.plugin.tags).length" class="tag">
                {{ t('marketplace.unknownTag') }}
              </span>
            </div>

            <p class="card-desc">{{ plugin.plugin.description }}</p>

            <div class="card-meta-row">
              <template v-for="(item, index) in getMetaItems(plugin)" :key="`${item.text}-${index}`">
                <span v-if="index > 0" class="meta-dot">·</span>
                <span class="meta-item" :class="`meta-${item.type}`">{{ item.text }}</span>
              </template>
            </div>
          </a>

          <div class="card-footer-actions">
            <div class="card-identity">
              <span class="card-identity-item" :class="`card-identity-item-${getPluginType(plugin.git.path)}`">
                {{ getPluginTypeLabel(plugin.git.path) }}
              </span>
              <span class="card-identity-separator">·</span>
              <span class="card-identity-item" :class="getMaintainerIdentityClass(plugin)">
                {{ getMaintainerLabel(plugin) }}
              </span>
            </div>
            <button type="button" class="card-action-btn card-action-command"
              :class="[`card-action-command-${getPluginType(plugin.git.path)}`, { copied: copiedInstallCommandPath === plugin.git.path }]"
              :aria-label="copiedInstallCommandPath === plugin.git.path ? t('marketplace.installCommandCopied') : t('marketplace.installPlugin')"
              :title="buildInstallCommand(plugin)" @click="copyInstallCommand(plugin)">
              <svg class="card-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 3v12"></path>
                <path d="M7 10l5 5 5-5"></path>
                <path d="M5 21h14"></path>
              </svg>
              <span>{{ copiedInstallCommandPath === plugin.git.path ? t('marketplace.copied') : t('marketplace.install') }}</span>
            </button>

            <button type="button" class="card-action-btn card-action-share"
              :class="[`card-action-share-${getMaintainerKey(plugin)}`, { copied: copiedPluginPath === plugin.git.path }]"
              :aria-label="copiedPluginPath === plugin.git.path ? t('marketplace.copied') : t('marketplace.share')"
              :title="copiedPluginPath === plugin.git.path ? t('marketplace.copied') : t('marketplace.share')" @click="sharePlugin(plugin)">
              <svg class="card-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                aria-hidden="true">
                <path d="M8.59 13.51l6.83 3.98"></path>
                <path d="M15.41 6.51L8.59 10.49"></path>
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
              </svg>
              <span>{{ copiedPluginPath === plugin.git.path ? t('marketplace.copied') : t('marketplace.share') }}</span>
            </button>

          </div>
        </article>
      </div>
    </div>

    <Transition name="install-notice">
      <div v-if="installNotice.visible" class="install-notice" role="status" aria-live="polite">
        <button type="button" class="install-notice-close" :aria-label="t('marketplace.closeInstallTip')" @click="closeInstallNotice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
        <div class="install-notice-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </div>
        <div class="install-notice-body">
          <p class="install-notice-title">{{ installNotice.title }}</p>
          <ul class="install-notice-desc">
            <li v-for="tip in installNotice.tips" :key="tip">{{ tip }}</li>
          </ul>
          <a :href="installNotice.docUrl" class="install-notice-link">{{ t('marketplace.viewInstallDocs') }}</a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ref, computed, watch, onMounted, onBeforeUnmount, reactive } from 'vue'
import { withBase } from 'vuepress/client'
import { useI18n } from '../composables/useI18n'

const { t, tm, withLocale } = useI18n()

type PluginType = 'backend' | 'frontend'
type PluginMaintainer = 'official' | 'community'
type PluginSource = 'registry' | 'marked'
type SortKey = 'name' | 'updated' | 'listed'

interface PluginStats {
  stars?: number
  forks?: number
  watchers?: number
  // 仓库许可证，没有许可证时为 null
  license?: string | null
  updatedAt?: string | null
  listedAt?: string | null
}

interface InstallNotice {
  visible: boolean
  title: string
  tips: string[]
  docUrl: string
}

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
    tags?: string[]
  }
  // 收录方式：registry 为官方仓库 PR 收录，marked 为主题收录
  source?: PluginSource
  stats?: PluginStats
}

const CACHE_KEY = 'fba_plugins_cache'
// 插件仓库推送后即重新生成清单，缓存时长与其保持一致
const CACHE_DURATION = 60 * 60 * 1000
const FRONTEND_REPO_SUFFIXES = ['_ui', '-ui'] as const
const PLUGIN_TYPES: PluginType[] = ['backend', 'frontend']
const PLUGIN_MAINTAINERS: PluginMaintainer[] = ['official', 'community']
const INSTALL_DOC_BASE = computed(() => withBase(withLocale('/plugin/install.html')))

// 插件清单由官方插件仓库 fastapi-practices/plugins 生成，运行时直接读取
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
const currentMaintainer = ref<'all' | PluginMaintainer>('all')
const currentType = ref<'all' | PluginType>('all')
const currentCollect = ref<'all' | PluginSource>('all')
const currentSort = ref<SortKey>('name')
const pluginMaintainers = PLUGIN_MAINTAINERS
const pluginTypes = PLUGIN_TYPES
const searchQuery = ref('')
const failedIcons = reactive(new Set<string>())
const copiedPluginPath = ref('')
const copiedInstallCommandPath = ref('')
const installNotice = reactive<InstallNotice>({
  visible: false,
  title: '',
  tips: [],
  docUrl: ''
})
const { copy: copyToClipboard } = useClipboard({ legacy: true })
let copiedTimer: ReturnType<typeof setTimeout> | null = null
let copiedInstallCommandTimer: ReturnType<typeof setTimeout> | null = null
let installNoticeTimer: ReturnType<typeof setTimeout> | null = null

const matchesMaintainer = (plugin: PluginItem, maintainer: PluginMaintainer): boolean => {
  return maintainer === 'official' ? isOfficialPlugin(plugin) : !isOfficialPlugin(plugin)
}

const matchesType = (plugin: PluginItem, type: PluginType): boolean => {
  return getPluginType(plugin.git?.path || '') === type
}

// 收录方式：缺失时按官方仓库 PR 收录处理
const getCollectSource = (plugin: PluginItem): PluginSource => {
  return plugin.source === 'marked' ? 'marked' : 'registry'
}

const getPluginSummary = (plugin: PluginItem): string => plugin.plugin?.summary || ''

// 固定语言环境，避免不同浏览器对中英文混排的排序结果不一致
const nameCollator = new Intl.Collator('en-US', { numeric: true, sensitivity: 'base' })

// 拼音排序模块按需加载，插件市场之外的页面不会带上这部分数据
const pinyinReady = ref(false)
let pinyinComparator: ((a: string, b: string) => number) | null = null

const compareByName = (a: PluginItem, b: PluginItem): number => {
  const nameA = getPluginSummary(a)
  const nameB = getPluginSummary(b)
  if (pinyinComparator) return pinyinComparator(nameA, nameB)
  return nameCollator.compare(nameA, nameB)
}

const loadPinyinComparator = async () => {
  try {
    const mod = await import('../utils/pinyin')
    pinyinComparator = mod.compareByPinyin
  } catch (e) {
    console.warn('Pinyin sort module load failed:', e)
  } finally {
    pinyinReady.value = true
  }
}

const getTimeValue = (value?: string | null): number => {
  if (!value) return 0
  const time = Date.parse(value)
  return Number.isNaN(time) ? 0 : time
}

const getStars = (plugin: PluginItem): number => Number(plugin.stats?.stars) || 0

// 排序规则：名称、最近更新、最近上架
const sorters: Record<SortKey, (a: PluginItem, b: PluginItem) => number> = {
  name: (a, b) => compareByName(a, b),
  updated: (a, b) =>
    getTimeValue(b.stats?.updatedAt) - getTimeValue(a.stats?.updatedAt) ||
    getStars(b) - getStars(a) ||
    compareByName(a, b),
  listed: (a, b) =>
    getTimeValue(b.stats?.listedAt) - getTimeValue(a.stats?.listedAt) ||
    getStars(b) - getStars(a) ||
    compareByName(a, b),
}

// 兜底数据源没有更新时间，此时按时间排序无意义
const hasTimeStats = computed(() =>
  plugins.value.some(plugin => !!plugin.stats?.updatedAt || !!plugin.stats?.listedAt),
)

// 数据源切换后，若当前排序已不可用则回退到名称排序
watch(hasTimeStats, (available) => {
  if (!available && currentSort.value !== 'name') {
    currentSort.value = 'name'
  }
})

const filteredPlugins = computed(() => {
  let result = plugins.value
  const maintainer = currentMaintainer.value
  const type = currentType.value
  const collect = currentCollect.value

  if (maintainer !== 'all') {
    result = result.filter(p => matchesMaintainer(p, maintainer))
  }

  if (type !== 'all') {
    result = result.filter(p => matchesType(p, type))
  }

  if (collect !== 'all') {
    result = result.filter(p => getCollectSource(p) === collect)
  }

  if (currentTag.value !== 'all') {
    result = result.filter(p => p.plugin?.tags?.includes(currentTag.value))
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(p =>
      p.plugin?.summary?.toLowerCase().includes(query) ||
      p.plugin?.description?.toLowerCase().includes(query) ||
      p.plugin?.author?.toLowerCase().includes(query) ||
      getPluginName(p.git?.path || '').toLowerCase().includes(query) ||
      p.git?.path?.toLowerCase().includes(query)
    )
  }

  // 筛选之后再排序
  return [...result].sort(sorters[currentSort.value])
})

const getRepoName = (path: string): string => {
  if (!path) return 'unknown'
  const parts = path.split('/')
  return parts[parts.length - 1] || 'unknown'
}

const getFrontendRepoSuffix = (repoName: string): string => {
  return FRONTEND_REPO_SUFFIXES.find(suffix => repoName.endsWith(suffix)) || ''
}

const getPluginName = (path: string): string => {
  const repoName = getRepoName(path)
  const suffix = getFrontendRepoSuffix(repoName)
  return suffix ? repoName.slice(0, -suffix.length) : repoName
}

const getInitial = (path: string): string => {
  return getPluginName(path).charAt(0).toUpperCase()
}

const getPluginType = (path: string): PluginType => {
  return getFrontendRepoSuffix(getRepoName(path)) ? 'frontend' : 'backend'
}

const getPluginTypeLabel = (path: string): string => {
  return getPluginType(path) === 'frontend'
    ? t('marketplace.frontend')
    : t('marketplace.backend')
}

const getMaintainerFilterLabel = (maintainer: PluginMaintainer): string => {
  return t(`marketplace.${maintainer}`)
}

const getTypeFilterLabel = (type: PluginType): string => {
  return t(`marketplace.${type}`)
}

const getInstallUrl = (path: string): string => {
  const anchor = getPluginType(path) === 'frontend'
    ? t('marketplace.frontendAnchor')
    : t('marketplace.backendAnchor')
  return `${INSTALL_DOC_BASE.value}${anchor}`
}

const buildInstallCommand = (plugin: PluginItem): string => {
  const args = ['fba', 'add', '--repo-url', plugin.git.url]
  if (getPluginType(plugin.git.path) === 'frontend') {
    args.push('--frontend')
  }
  return args.join(' ')
}

const buildInstallTips = (plugin: PluginItem): string[] => {
  const pluginName = plugin.plugin.summary.trim()
  if (getPluginType(plugin.git.path) === 'frontend') {
    return [
      t('marketplace.installCommandCopiedFor', { name: pluginName }),
      t('marketplace.activateVenvTip'),
      t('marketplace.frontendPathTip'),
    ]
  }
  return [
    t('marketplace.installCommandCopiedFor', { name: pluginName }),
    t('marketplace.activateVenvTip'),
    t('marketplace.restartServiceTip'),
  ]
}

const getRepoFullName = (url: string): string => {
  const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/i)
  if (!match) return ''
  return `${match[1]}/${match[2].replace(/\.git$/i, '')}`
}

const getRepoOwner = (url: string): string => {
  return getRepoFullName(url).split('/')[0] || ''
}

const isOfficialPlugin = (plugin: PluginItem): boolean => {
  return getRepoOwner(plugin.git.url) === 'fastapi-practices'
}

const getMaintainerLabel = (plugin: PluginItem): string => {
  return isOfficialPlugin(plugin) ? t('marketplace.official') : t('marketplace.community')
}

const getMaintainerKey = (plugin: PluginItem): 'official' | 'community' => {
  return isOfficialPlugin(plugin) ? 'official' : 'community'
}

const getMaintainerIdentityClass = (plugin: PluginItem): string => {
  return `card-identity-item-${getMaintainerKey(plugin)}`
}

const buildShareText = (plugin: PluginItem): string => {
  const summary = plugin.plugin.summary.trim()
  const description = plugin.plugin.description?.replace(/\s+/g, ' ').trim()

  return [
    t('marketplace.shareFound', { name: summary }),
    description || t('marketplace.shareTry'),
    t('marketplace.shareRepo', { url: plugin.git.url }),
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

const copyInstallCommand = async (plugin: PluginItem) => {
  try {
    const command = buildInstallCommand(plugin)
    await copyToClipboard(command)
    copiedInstallCommandPath.value = plugin.git.path
    installNotice.title = t('marketplace.installCommandCopiedTitle')
    installNotice.tips = buildInstallTips(plugin)
    installNotice.docUrl = getInstallUrl(plugin.git.path)
    installNotice.visible = true

    if (copiedInstallCommandTimer) clearTimeout(copiedInstallCommandTimer)
    copiedInstallCommandTimer = setTimeout(() => {
      copiedInstallCommandPath.value = ''
      copiedInstallCommandTimer = null
    }, 1800)

    if (installNoticeTimer) clearTimeout(installNoticeTimer)
    installNoticeTimer = setTimeout(closeInstallNotice, 8000)
  } catch (e) {
    console.warn('Install command copy failed:', e)
  }
}

const closeInstallNotice = () => {
  installNotice.visible = false
  if (installNoticeTimer) {
    clearTimeout(installNoticeTimer)
    installNoticeTimer = null
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

// 卡片元信息：版本 · 许可证 · 日期
// 仓库没有许可证时不显示该段
const getMetaItems = (plugin: PluginItem): { text: string, type: string }[] => {
  const items: { text: string, type: string }[] = [
    { text: `v${plugin.plugin.version}`, type: 'version' },
  ]

  const license = plugin.stats?.license
  if (license) items.push({ text: license, type: 'license' })

  if (plugin.stats?.updatedAt) {
    items.push({ text: formatDate(plugin.stats.updatedAt), type: 'date' })
  }

  return items
}

// 日期格式化
const formatDate = (value?: string | null): string => {
  if (!value) return ''
  const time = Date.parse(value)
  if (Number.isNaN(time)) return ''
  const date = new Date(time)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const getTagLabel = (tag: string): string => {
  const fixed: Record<string, string> = { ai: 'AI', mcp: 'MCP', agent: 'Agent' }
  if (fixed[tag]) return fixed[tag]
  const labels = tm<Record<string, string>>('marketplace.tags') || {}
  return labels[tag] || tag
}

const KNOWN_TAGS = new Set(['ai', 'mcp', 'agent', 'auth', 'storage', 'notification', 'task', 'payment', 'other'])

const filteredValidTags = computed(() => {
  return validTags.value.filter(tag => KNOWN_TAGS.has(tag))
})

const getValidTags = (tags: string[] | undefined): string[] => {
  if (!tags) return []
  return tags.filter(tag => KNOWN_TAGS.has(tag))
}

const resetFilters = () => {
  searchQuery.value = ''
  currentTag.value = 'all'
  currentMaintainer.value = 'all'
  currentType.value = 'all'
  currentCollect.value = 'all'
  currentSort.value = 'name'
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

const loadFromCache = <T>(key: string, duration: number): T | null => {
  try {
    const cached = localStorage.getItem(key)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < duration) {
        return data as T
      }
    }
  } catch (e) {
    console.warn('Cache read error:', e)
  }
  return null
}

const saveToCache = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.warn('Cache write error:', e)
  }
}

const fetchTextWithFallback = async (sources: string[]): Promise<string> => {
  for (const url of sources) {
    try {
      const response = await fetch(url, { cache: 'no-cache' })
      if (response.ok) {
        return await response.text()
      }
    } catch (e) {
      console.warn(`Failed to fetch from ${url}:`, e)
    }
  }
  throw new Error('All data sources failed')
}

const applyPluginsData = (data: { tags: string[], plugins: PluginItem[] }) => {
  validTags.value = data.tags
  plugins.value = data.plugins
  saveToCache(CACHE_KEY, data)
}

const fetchPlugins = async () => {
  loading.value = true
  error.value = ''

  // 1. 命中缓存先渲染，再后台刷新
  const cached = loadFromCache<{ tags: string[], plugins: PluginItem[] }>(CACHE_KEY, CACHE_DURATION)
  if (cached?.plugins?.length) {
    validTags.value = cached.tags
    plugins.value = cached.plugins
    loading.value = false
    refreshPlugins()
    return
  }

  // 2. 拉取官方插件仓库生成的插件清单
  try {
    const text = await fetchTextWithFallback(DATA_SOURCES)
    applyPluginsData(parseTypeScriptData(text))
  } catch (e) {
    console.error('Fetch error:', e)
    error.value = t('marketplace.loadFailed')
  } finally {
    loading.value = false
  }
}

// 后台刷新插件清单
const refreshPlugins = async () => {
  try {
    const text = await fetchTextWithFallback(DATA_SOURCES)
    applyPluginsData(parseTypeScriptData(text))
  } catch (e) {
    console.warn('Plugins data refresh failed:', e)
  }
}

onMounted(async () => {
  await Promise.all([loadPinyinComparator(), fetchPlugins()])
})

onBeforeUnmount(() => {
  if (copiedTimer) clearTimeout(copiedTimer)
  if (copiedInstallCommandTimer) clearTimeout(copiedInstallCommandTimer)
  if (installNoticeTimer) clearTimeout(installNoticeTimer)
})
</script>

<style scoped>
.plugin-marketplace {
  --backend-accent: var(--vp-c-brand-1);
  --backend-soft: var(--vp-c-brand-soft);
  --frontend-accent: #7c3aed;
  --frontend-soft: rgba(124, 58, 237, 0.12);
  --official-accent: #0f766e;
  --official-soft: rgba(15, 118, 110, 0.12);
  --community-accent: #b45309;
  --community-soft: rgba(180, 83, 9, 0.12);
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
  width: 100%;
  max-width: 960px;
  margin: 0 auto 32px;
}

.search-wrapper {
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: 40px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: border-color 0.2s;
}

.search-wrapper:focus-within {
  border-color: var(--vp-c-brand-1);
}

.search-field {
  position: relative;
  flex: 1;
  min-width: 0;
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
  padding: 0 12px 0 42px;
  font-size: 14px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.filter-selects {
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
}

.filter-select-field {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px 0 12px;
  border-left: 1px solid var(--vp-c-divider);
  cursor: pointer;
}

.filter-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.filter-select {
  min-width: 64px;
  max-width: 120px;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
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
  grid-template-columns: minmax(0, 1fr);
}

@media (min-width: 640px) {
  .plugin-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .plugin-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .plugin-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.plugin-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 16px 18px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.card-identity {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  align-self: center;
  margin-right: auto;
  color: var(--vp-c-text-3);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  opacity: 0.78;
  pointer-events: none;
}

.card-identity-item {
  display: inline-flex;
  align-items: center;
}

.card-identity-separator {
  color: color-mix(in srgb, var(--vp-c-text-3) 72%, transparent);
  font-size: 13px;
  font-weight: 700;
  line-height: 0;
}

.card-identity-item-backend {
  color: var(--backend-accent);
}

.card-identity-item-frontend {
  color: var(--frontend-accent);
}

.card-identity-item-official {
  color: var(--official-accent);
}

.card-identity-item-community {
  color: var(--community-accent);
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
  display: flex;
  flex-direction: column;
}

.plugin-card:hover {
  background: var(--vp-c-bg);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
}

.plugin-card-backend {
  border-color: color-mix(in srgb, var(--backend-accent) 10%, var(--vp-c-divider));
}

.plugin-card-backend:hover {
  border-color: color-mix(in srgb, var(--backend-accent) 18%, var(--vp-c-divider));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
}

.plugin-card-frontend {
  border-color: color-mix(in srgb, var(--frontend-accent) 12%, var(--vp-c-divider));
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
  min-width: 0;
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

.card-source-badge {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 11px;
  line-height: 16px;
}

.card-author {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin: 6px 0 0;
  line-height: 1.2;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-author-name {
  color: var(--vp-c-text-1);
}
.card-author-sep {
  color: var(--vp-c-text-3);
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
  margin-bottom: 10px;
}
.card-footer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
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

/* 安装按钮跟随前后端配色，分享按钮跟随官方或社区配色 */
.card-action-command-backend {
  --action-accent: var(--backend-accent);
}

.card-action-command-frontend {
  --action-accent: var(--frontend-accent);
}

.card-action-share-official {
  --action-accent: var(--official-accent);
}

.card-action-share-community {
  --action-accent: var(--community-accent);
}

.card-action-command:hover,
.card-action-command.copied,
.card-action-share:hover,
.card-action-share.copied {
  border-color: color-mix(in srgb, var(--action-accent) 24%, var(--vp-c-divider));
  color: var(--action-accent);
}

.card-action-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.tag {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
}
.card-meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 10px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.meta-item {
  white-space: nowrap;
}
.meta-dot {
  color: var(--vp-c-text-3);
  opacity: 0.6;
}
.meta-version {
  font-weight: 500;
}
.meta-date {
  font-variant-numeric: tabular-nums;
}

.install-notice {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 12px;
  width: min(420px, calc(100vw - 32px));
  padding: 16px 44px 16px 16px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid color-mix(in srgb, #16a34a 26%, var(--vp-c-divider));
  border-radius: 8px;
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.14);
}

.install-notice-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #16a34a;
  background: color-mix(in srgb, #16a34a 12%, transparent);
  border-radius: 50%;
}

.install-notice-icon svg,
.install-notice-close svg {
  width: 16px;
  height: 16px;
}

.install-notice-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.install-notice-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.install-notice-desc {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  list-style: disc;
}

.install-notice-desc li {
  padding-left: 2px;
}

.install-notice-desc li + li {
  margin-top: 2px;
}

.install-notice-link {
  display: inline-flex;
  align-self: flex-start;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.install-notice-link:hover {
  text-decoration: underline;
}

.install-notice-close {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.install-notice-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.install-notice-enter-active,
.install-notice-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.install-notice-enter-from,
.install-notice-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 768px) {
  .plugin-marketplace {
    padding: 36px 18px;
  }

  .header-actions {
    flex-wrap: wrap;
    gap: 12px;
  }

  .search-wrapper {
    flex-wrap: wrap;
  }

  .search-field {
    flex: 1 1 100%;
  }

  .filter-selects {
    flex: 1 1 100%;
    border-top: 1px solid var(--vp-c-divider);
  }

  .filter-select-field {
    flex: 1;
    min-width: 0;
    height: 40px;
  }

  .filter-select-field:first-child {
    border-left: none;
  }

  .filter-select {
    flex: 1;
    min-width: 0;
    max-width: none;
  }

  .card-author {
    white-space: normal;
  }

  .card-footer-actions {
    margin-top: 10px;
  }

  .install-notice {
    right: 16px;
    bottom: 16px;
  }
}

@media (max-width: 480px) {
  .filter-selects {
    flex-wrap: wrap;
  }

  .filter-select-field {
    flex: 1 1 50%;
  }

  .filter-select-field:nth-child(3) {
    flex-basis: 100%;
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }

  .filter-select-field:nth-child(4) {
    border-left: none;
  }
}
</style>
