<template>
  <div class="plugin-marketplace">
    <header class="marketplace-header">
      <h1 class="header-title">插件市场</h1>
      <p class="header-subtitle">
        发现由
        <a href="https://github.com/fastapi-practices/plugins" target="_blank">fastapi-practices/plugins</a>
        收录的插件，扩展你的应用能力
      </p>
      <div class="header-actions">
        <a :href="withBase('/plugin/dev')" class="action-link">创建插件</a>
        <a href="https://github.com/fastapi-practices/plugins/issues" target="_blank" class="action-link">申请插件</a>
        <a :href="withBase('/plugin/share')" class="action-link">发布插件</a>
      </div>
    </header>

    <div class="marketplace-controls">
      <div class="search-wrapper">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M11.5 3.5l1.15 2.85 2.85 1.15-2.85 1.15-1.15 2.85-1.15-2.85-2.85-1.15 2.85-1.15L11.5 3.5z"></path>
          <path d="M18.3 11.8l.72 1.78 1.78.72-1.78.72-.72 1.78-.72-1.78-1.78-.72 1.78-.72.72-1.78z"></path>
          <path d="M6.2 13.4l.92 2.28 2.28.92-2.28.92-0.92 2.28-.92-2.28-2.28-.92 2.28-.92.92-2.28z"></path>
        </svg>
        <input v-model="searchQuery" type="text" placeholder="探索符合你需求的插件：名称、作者、描述..." class="search-input" />
      </div>

      <div class="filter-tabs">
        <button class="filter-tab" :class="{ active: currentTag === 'all' }" @click="currentTag = 'all'">
          全部
        </button>
        <button v-for="tag in filteredValidTags" :key="tag" class="filter-tab" :class="{ active: currentTag === tag }"
          @click="currentTag = tag">
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
                  <span class="card-version">v{{ plugin.plugin.version }}</span>
                </div>
                <p class="card-author">{{ plugin.plugin.author }} / {{ getPluginName(plugin.git.path) }}</p>
              </div>
            </a>
          </div>

          <a :href="plugin.git.url" target="_blank" rel="noreferrer" class="card-main-link card-main-link-body">
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
              :class="{ copied: copiedInstallCommandPath === plugin.git.path }"
              :aria-label="copiedInstallCommandPath === plugin.git.path ? '已复制安装命令' : '安装插件'"
              :title="buildInstallCommand(plugin)" @click="copyInstallCommand(plugin)">
              <svg class="card-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 3v12"></path>
                <path d="M7 10l5 5 5-5"></path>
                <path d="M5 21h14"></path>
              </svg>
              <span>{{ copiedInstallCommandPath === plugin.git.path ? '已复制' : '安装' }}</span>
            </button>

            <button type="button" class="card-action-btn card-action-share"
              :class="{ copied: copiedPluginPath === plugin.git.path }"
              :aria-label="copiedPluginPath === plugin.git.path ? '已复制' : '分享'"
              :title="copiedPluginPath === plugin.git.path ? '已复制' : '分享'" @click="sharePlugin(plugin)">
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

    <Transition name="install-notice">
      <div v-if="installNotice.visible" class="install-notice" role="status" aria-live="polite">
        <button type="button" class="install-notice-close" aria-label="关闭安装提示" @click="closeInstallNotice">
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
          <a :href="installNotice.docUrl" class="install-notice-link">查看安装文档</a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { withBase } from 'vuepress/client'

type PluginType = 'backend' | 'frontend'

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
const FRONTEND_REPO_SUFFIXES = ['_ui', '-ui'] as const
const INSTALL_DOC_BASE = withBase('/plugin/install.html')

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
      getPluginName(p.git?.path || '').toLowerCase().includes(query) ||
      p.git?.path?.toLowerCase().includes(query)
    )
  }

  return result
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
  return getPluginType(path) === 'frontend' ? '前端' : '后端'
}

const getInstallUrl = (path: string): string => {
  return `${INSTALL_DOC_BASE}${getPluginType(path) === 'frontend' ? '#前端' : '#后端'}`
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
      `已复制「${pluginName}」的安装命令`,
      '请在后端项目根目录激活虚拟环境后执行',
      'CLI 会继续询问前端项目根路径'
    ]
  }
  return [
    `已复制「${pluginName}」的安装命令`,
    '请在后端项目根目录激活虚拟环境后执行',
    '按插件 README 完成配置后重启服务'
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
  return isOfficialPlugin(plugin) ? '官方' : '社区'
}

const getMaintainerIdentityClass = (plugin: PluginItem): string => {
  return isOfficialPlugin(plugin) ? 'card-identity-item-official' : 'card-identity-item-community'
}

const buildShareText = (plugin: PluginItem): string => {
  const summary = plugin.plugin.summary.trim()
  const description = plugin.plugin.description?.replace(/\s+/g, ' ').trim()

  return [
    `发现一个不错的 fba 插件「${summary}」`,
    description || '值得放进你的项目里试一试。',
    `仓库地址：${plugin.git.url}`
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
    installNotice.title = '安装命令已复制'
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
      console.warn(`Failed to fetch from ${url}:`, e)
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
    loading.value = false

    fetchWithFallback()
      .then(text => {
        const data = parseTypeScriptData(text)
        validTags.value = data.tags
        plugins.value = data.plugins
        saveToCache(data)
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
  color: #0f766e;
}

.card-identity-item-community {
  color: #b45309;
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

.card-action-share:hover,
.card-action-share.copied {
  border-color: color-mix(in srgb, var(--frontend-accent) 24%, var(--vp-c-divider));
  color: var(--frontend-accent);
}

.card-action-command:hover,
.card-action-command.copied {
  border-color: color-mix(in srgb, #16a34a 24%, var(--vp-c-divider));
  color: #16a34a;
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
</style>
