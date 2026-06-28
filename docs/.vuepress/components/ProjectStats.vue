<template>
  <section class="project-stats">
    <header class="stats-header">
      <h2 class="stats-title">开源驱动，社区共建</h2>
      <p class="stats-subtitle">数字会说话，这是开发者们的真实选择</p>
    </header>

    <div class="stats-grid">
      <a v-for="item in items" :key="item.key" :href="item.href" target="_blank" rel="noreferrer" class="stats-card"
        :class="{ 'is-loading': item.loading }">
        <div class="stats-icon" v-html="item.icon"></div>
        <div class="stats-value">
          <span v-if="item.loading" class="stats-skeleton"></span>
          <span v-else>{{ item.display }}</span>
          <span class="stats-suffix" v-if="!item.loading && item.suffix">{{ item.suffix }}</span>
        </div>
        <div class="stats-label">{{ item.label }}</div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { withBase } from 'vuepress/client'

interface RawStats {
  stars: number | null
  forks: number | null
  watchers: number | null
  contributors: number | null
  plugins: number | null
}

const CACHE_KEY = 'fba_project_stats_cache'
const CACHE_TTL = 24 * 60 * 60 * 1000

const REPO = 'fastapi-practices/fastapi-best-architecture'

interface RepoStatsSource {
  url: string
  parse: (data: any) => Partial<RawStats>
}

interface ContributorsSource {
  url: string
  parse: (data: any, res: Response) => number | null
}

// 多镜像 fallback，规避 api.github.com 60 次/小时 的匿名限频
const REPO_STATS_SOURCES: RepoStatsSource[] = [
  // ungh.cc（UnJS 团队维护的 GitHub 镜像，服务端缓存 + 无频率限制）
  {
    url: `https://ungh.cc/repos/${REPO}`,
    parse: (data) => ({
      stars: typeof data?.repo?.stars === 'number' ? data.repo.stars : null,
      forks: typeof data?.repo?.forks === 'number' ? data.repo.forks : null,
      watchers: typeof data?.repo?.watchers === 'number' ? data.repo.watchers : null,
    }),
  },
  // GitHub 官方 API
  {
    url: `https://api.github.com/repos/${REPO}`,
    parse: (data) => ({
      stars: typeof data?.stargazers_count === 'number' ? data.stargazers_count : null,
      forks: typeof data?.forks_count === 'number' ? data.forks_count : null,
      watchers: typeof data?.subscribers_count === 'number' ? data.subscribers_count : null,
    }),
  },
  // kkgithub 镜像
  {
    url: `https://api.kkgithub.com/repos/${REPO}`,
    parse: (data) => ({
      stars: typeof data?.stargazers_count === 'number' ? data.stargazers_count : null,
      forks: typeof data?.forks_count === 'number' ? data.forks_count : null,
      watchers: typeof data?.subscribers_count === 'number' ? data.subscribers_count : null,
    }),
  },
]

const CONTRIBUTORS_SOURCES: ContributorsSource[] = [
  // ungh.cc 直接返回数组，长度即贡献者数
  {
    url: `https://ungh.cc/repos/${REPO}/contributors`,
    parse: (data) => Array.isArray(data?.contributors) ? data.contributors.length : null,
  },
  // GitHub 官方 API：anon=1 + Link 头解析末页页码 = 总数
  {
    url: `https://api.github.com/repos/${REPO}/contributors?per_page=1&anon=1`,
    parse: (data, res) => {
      const link = res.headers.get('Link') || ''
      const lastMatch = link.match(/page=(\d+)>;\s*rel="last"/)
      if (lastMatch) return parseInt(lastMatch[1], 10)
      return Array.isArray(data) ? data.length : null
    },
  },
  // kkgithub 镜像
  {
    url: `https://api.kkgithub.com/repos/${REPO}/contributors?per_page=1&anon=1`,
    parse: (data, res) => {
      const link = res.headers.get('Link') || ''
      const lastMatch = link.match(/page=(\d+)>;\s*rel="last"/)
      if (lastMatch) return parseInt(lastMatch[1], 10)
      return Array.isArray(data) ? data.length : null
    },
  },
]

const PLUGINS_DATA_SOURCES = [
  'https://raw.githubusercontent.com/fastapi-practices/plugins/refs/heads/master/plugins-data.ts',
  'https://fastly.jsdelivr.net/gh/fastapi-practices/plugins@master/plugins-data.ts',
  'https://cdn.jsdelivr.net/gh/fastapi-practices/plugins@master/plugins-data.ts',
]

const stats = reactive<RawStats>({
  stars: null,
  forks: null,
  watchers: null,
  contributors: null,
  plugins: null,
})

const loading = reactive({
  github: true,
  contributors: true,
  plugins: true,
})

const format = (n: number | null): string => {
  if (n === null) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

const items = computed(() => [
  {
    key: 'stars',
    label: 'GitHub Stars',
    display: format(stats.stars),
    suffix: '',
    loading: loading.github,
    href: `https://github.com/${REPO}/stargazers`,
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></svg>`,
  },
  {
    key: 'forks',
    label: 'Forks',
    display: format(stats.forks),
    suffix: '',
    loading: loading.github,
    href: `https://github.com/${REPO}/network/members`,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v3c0 1.7-1.3 3-3 3H9c-1.7 0-3-1.3-3-3V9"/><path d="M12 15v0"/></svg>`,
  },
  {
    key: 'contributors',
    label: '贡献者',
    display: format(stats.contributors),
    suffix: '+',
    loading: loading.contributors,
    href: `https://github.com/${REPO}/graphs/contributors`,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
  {
    key: 'plugins',
    label: '官方插件',
    display: format(stats.plugins),
    suffix: '',
    loading: loading.plugins,
    href: withBase('/marketplace.html'),
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7h-3V4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3H4a1 1 0 0 0-1 1v8a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V8a1 1 0 0 0-1-1z"/><path d="M9 14v3"/><path d="M15 14v3"/></svg>`,
  },
])

const loadCache = (): { data: RawStats, timestamp: number } | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed?.timestamp === 'number' && parsed.data) {
      return parsed
    }
  } catch (e) {
    console.warn('ProjectStats cache read failed:', e)
  }
  return null
}

const saveCache = () => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data: { ...stats }, timestamp: Date.now() }))
  } catch (e) {
    console.warn('ProjectStats cache write failed:', e)
  }
}

const fetchRepoStats = async () => {
  for (const source of REPO_STATS_SOURCES) {
    try {
      const res = await fetch(source.url, { headers: { Accept: 'application/json' } })
      if (!res.ok) continue
      const data = await res.json()
      const parsed = source.parse(data)
      if (typeof parsed.stars === 'number') stats.stars = parsed.stars
      if (typeof parsed.forks === 'number') stats.forks = parsed.forks
      if (typeof parsed.watchers === 'number') stats.watchers = parsed.watchers
      if (stats.stars !== null && stats.forks !== null) break
    } catch (e) {
      // try next
    }
  }
  loading.github = false
}

const fetchContributors = async () => {
  for (const source of CONTRIBUTORS_SOURCES) {
    try {
      const res = await fetch(source.url, { headers: { Accept: 'application/json' } })
      if (!res.ok) continue
      const data = await res.json().catch(() => null)
      const count = source.parse(data, res)
      if (typeof count === 'number' && count > 0) {
        stats.contributors = count
        break
      }
    } catch (e) {
      // try next
    }
  }
  loading.contributors = false
}

const fetchPlugins = async () => {
  for (const url of PLUGINS_DATA_SOURCES) {
    try {
      const res = await fetch(url, { cache: 'no-cache' })
      if (!res.ok) continue
      const text = await res.text()
      const startIdx = text.search(/export\s+const\s+pluginDataList[^=]*=\s*\[/)
      if (startIdx < 0) continue
      const slice = text.slice(startIdx)
      const itemCount = (slice.match(/"git"\s*:\s*\{/g) || []).length
      if (itemCount > 0) {
        stats.plugins = itemCount
        break
      }
    } catch (e) {
      // try next source
    }
  }
  loading.plugins = false
}

onMounted(async () => {
  const cached = loadCache()
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    Object.assign(stats, cached.data)
    loading.github = false
    loading.contributors = false
    loading.plugins = false
    return
  }

  await Promise.all([fetchRepoStats(), fetchContributors(), fetchPlugins()])
  saveCache()
})
</script>

<style scoped>
.project-stats {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px;
}

.stats-header {
  text-align: center;
  margin-bottom: 36px;
}

.stats-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.stats-subtitle {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stats-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 22px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.stats-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 148, 133, 0.08), transparent 55%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.stats-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 10px 28px -12px rgba(0, 148, 133, 0.35);
}

.stats-card:hover::before {
  opacity: 1;
}

.stats-icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 10px;
}

.stats-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.stats-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1;
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  letter-spacing: -0.02em;
}

.stats-suffix {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.stats-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  letter-spacing: 0.02em;
}

.stats-skeleton {
  display: inline-block;
  width: 64px;
  height: 28px;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--vp-c-bg-soft), var(--vp-c-divider), var(--vp-c-bg-soft));
  background-size: 200% 100%;
  animation: stats-shimmer 1.4s linear infinite;
}

@keyframes stats-shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
