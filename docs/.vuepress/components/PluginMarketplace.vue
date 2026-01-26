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
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索插件名称、作者或描述..."
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
        <a
            v-for="plugin in filteredPlugins"
            :key="plugin.git.path"
            :href="plugin.git.url"
            target="_blank"
            class="plugin-card"
        >
          <div class="card-top">
            <div class="card-icon">
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
          </div>
          <p class="card-desc">{{ plugin.plugin.description }}</p>
          <div class="card-tags"
               v-if="getValidDatabases(plugin.plugin.database).length || getValidTags(plugin.plugin.tags).length">
            <span v-for="db in getValidDatabases(plugin.plugin.database)" :key="'db-' + db"
                  class="tag tag-db">#{{ getDbLabel(db) }}</span>
            <span v-for="tag in getValidTags(plugin.plugin.tags).slice(0, 3)" :key="tag"
                  class="tag">#{{ getTagLabel(tag) }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'

// Data sync from: https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/backend/plugin/validator.py
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
const CACHE_DURATION = 10 * 60 * 1000

const DATA_SOURCES = [
  'https://raw.githubusercontent.com/fastapi-practices/plugins/refs/heads/master/plugins-data.ts',
  'https://fastly.jsdelivr.net/gh/fastapi-practices/plugins@master/plugins-data.ts',
  'https://cdn.jsdelivr.net/gh/fastapi-practices/plugins@master/plugins-data.ts'
]

const loading = ref(true)
const error = ref('')
const plugins = ref<any[]>([])
const validTags = ref<string[]>([])
const currentTag = ref('all')
const searchQuery = ref('')
const failedIcons = reactive(new Set<string>())

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

const parseTypeScriptData = (text: string): { tags: string[], plugins: any[] } => {
  const tags: string[] = []
  const pluginList: any[] = []

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

const loadFromCache = (): { tags: string[], plugins: any[] } | null => {
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

const saveToCache = (data: { tags: string[], plugins: any[] }) => {
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
</script>

<style scoped>
.plugin-marketplace {
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
  display: flex;
  flex-direction: column;
  padding: 16px 18px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.plugin-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-top {
  display: flex;
  gap: 12px;
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
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.card-author {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 0;
  line-height: 1.2;
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
  padding-top: 12px;
}

.tag {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
</style>
