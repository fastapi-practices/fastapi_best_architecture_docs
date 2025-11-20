<template>
  <div class="market-layout">
    <h1 class="market-title">插件市场</h1>

    <div class="content-wrapper">
      <div class="filter-card">
        <div class="filter-header">
          <h2>筛选条件</h2>
          <div class="header-buttons">
            <button v-if="isMobile" class="toggle-button" @click="isFilterExpanded = !isFilterExpanded">
              {{ isFilterExpanded ? '收起' : '展开' }}
            </button>
            <button class="reset-button" @click="resetFilters">
              重置
            </button>
          </div>
        </div>

        <transition name="filter-content">
          <div v-show="!isMobile || isFilterExpanded" class="filter-content">
            <div class="filter-search">
              <input
                  v-model="searchQuery"
                  class="search-input"
                  placeholder="🔍 搜索插件..."
                  type="text"
              />
            </div>

            <div class="filter-section">
              <h3 class="filter-title">插件类型</h3>
              <div class="filter-badges">
                <label class="filter-badge" :class="{ active: selectedCategory === '' }">
                  <input
                      type="radio"
                      :value="''"
                      v-model="selectedCategory"
                      name="category"
                  />
                  <span>全部类型</span>
                </label>
                <label
                    v-for="category in pluginCategories"
                    :key="category"
                    class="filter-badge"
                    :class="{ active: selectedCategory === category }"
                >
                  <input
                      type="radio"
                      :value="category"
                      v-model="selectedCategory"
                      name="category"
                  />
                  <span>{{ category }}</span>
                </label>
              </div>
            </div>

            <div class="filter-section">
              <h3 class="filter-title">价格区间</h3>
              <div class="filter-badges">
                <label class="filter-badge" :class="{ active: selectedPriceRange === '' }">
                  <input
                      type="radio"
                      :value="''"
                      v-model="selectedPriceRange"
                      name="price"
                  />
                  <span>全部价格</span>
                </label>
                <label class="filter-badge" :class="{ active: selectedPriceRange === 'free' }">
                  <input
                      type="radio"
                      value="free"
                      v-model="selectedPriceRange"
                      name="price"
                  />
                  <span>免费</span>
                </label>
                <label class="filter-badge" :class="{ active: selectedPriceRange === 'paid' }">
                  <input
                      type="radio"
                      value="paid"
                      v-model="selectedPriceRange"
                      name="price"
                  />
                  <span>付费</span>
                </label>
              </div>
            </div>

            <div class="filter-section">
              <h3 class="filter-title">插件状态</h3>
              <div class="filter-badges">
                <label class="filter-badge" :class="{ active: selectedStatus === '' }">
                  <input
                      type="radio"
                      :value="''"
                      v-model="selectedStatus"
                      name="status"
                  />
                  <span>全部状态</span>
                </label>
                <label class="filter-badge" :class="{ active: selectedStatus === 'active' }">
                  <input
                      type="radio"
                      value="active"
                      v-model="selectedStatus"
                      name="status"
                  />
                  <span>可用</span>
                </label>
                <label class="filter-badge" :class="{ active: selectedStatus === 'expired' }">
                  <input
                      type="radio"
                      value="expired"
                      v-model="selectedStatus"
                      name="status"
                  />
                  <span>已过期</span>
                </label>
              </div>
            </div>

            <div class="filter-section">
              <h3 class="filter-title">排序方式</h3>
              <div class="filter-badges">
                <label class="filter-badge" :class="{ active: sortOption === 'category' }">
                  <input
                      type="radio"
                      value="category"
                      v-model="sortOption"
                      name="sort"
                  />
                  <span>按类型排序</span>
                </label>
                <label class="filter-badge" :class="{ active: sortOption === 'title' }">
                  <input
                      type="radio"
                      value="title"
                      v-model="sortOption"
                      name="sort"
                  />
                  <span>按名称排序</span>
                </label>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="plugin-section">
        <div class="results-header">
          <h2 class="results-title">插件列表</h2>
          <div class="results-count">
            找到 <strong>{{ filteredItems.length }}</strong> 个插件
          </div>
        </div>

        <div class="plugin-card-container">
          <div v-if="filteredItems.length === 0" class="no-results">
            <div class="no-results-icon">🔍</div>
            <h3>未找到匹配的插件</h3>
            <p>请尝试调整筛选条件或搜索关键词</p>
          </div>

          <div
              v-for="(item, index) in filteredItems"
              :key="index"
              :class="{ 'clickable': item.link, 'expired': item.expired }"
              class="plugin-card"
              @click="handleCardClick(item)"
          >
            <div class="card-image">
              <img
                  v-if="item.image"
                  :alt="item.title"
                  :src="item.image"
                  class="image-content"
              />
              <div v-else class="image-placeholder">
                <Icon :name="item.icon" color="var(--vp-c-text-1)" size="5em" />
              </div>
              <div v-if="item.expired" class="expired-overlay">
                <span class="expired-text">已过期，不适用</span>
              </div>
            </div>
            <div class="card-content">
              <div class="card-title-row">
                <img v-if="item.logo" :src="item.logo" class="logo" />
                <h3 class="card-title">{{ item.title }}</h3>
                <div class="card-title-link">
                  <a
                      :href="item.link"
                      rel="noopener noreferrer"
                      target="_blank"
                      @click.stop
                  />
                  <span class="label-inline">{{ item.label || '内置' }}</span>
                </div>
              </div>
              <p class="card-description">{{ item.description }}</p>
              <div class="card-tags">
                <Badge
                    v-for="(tag, tagIndex) in item.tags"
                    :key="tagIndex"
                    :style="colors[tag]"
                    :text="tag"
                />
              </div>
            </div>
            <div v-if="item.expired" class="expired-overlay-card"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

export interface PluginItem {
  icon: string
  title: string
  description: string
  label?: string
  tags: string[]
  link?: string
  image?: string
  logo: string
  free?: boolean
  expired?: boolean
}

const props = withDefaults(
    defineProps<{
      items: PluginItem[]
      columns?: number
    }>(),
    {
      columns: 4
    }
)

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPriceRange = ref('')
const selectedStatus = ref('')
const sortOption = ref('category')

const isFilterExpanded = ref(true)

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const isMobile = computed(() => {
  return windowWidth.value < 768
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})

const pluginCategories = ['前端', '后端']

const baseFilteredItems = computed(() => {
  let result = [...props.items]

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    result = result.filter(item =>
        item.tags.includes(selectedCategory.value)
    )
  }

  if (selectedPriceRange.value === 'free') {
    result = result.filter(item => !item.tags.includes('unfree'))
  } else if (selectedPriceRange.value === 'paid') {
    result = result.filter(item => item.tags.includes('unfree'))
  }

  if (selectedStatus.value === 'active') {
    result = result.filter(item => !item.expired)
  } else if (selectedStatus.value === 'expired') {
    result = result.filter(item => item.expired)
  }

  return result
})

const getTypeSortWeight = (item: PluginItem): number => {
  const label = item.label || '内置'
  if (label === '内置') return 1
  if (label === '官方') return 2
  return 3
}

const mixedAlphabeticalCompare = (a: string, b: string): number => {
  return a.localeCompare(b, 'zh-CN', {
    sensitivity: 'base',
    numeric: true,
    ignorePunctuation: true
  })
}

const filteredItems = computed(() => {
  const result = [...baseFilteredItems.value]

  return result.sort((a, b) => {
    switch (sortOption.value) {
      case 'title':
        return mixedAlphabeticalCompare(a.title, b.title)
      case 'category':
        const aWeight = getTypeSortWeight(a)
        const bWeight = getTypeSortWeight(b)
        if (aWeight !== bWeight) return aWeight - bWeight
        return mixedAlphabeticalCompare(a.title, b.title)
      default:
        return 0
    }
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPriceRange.value = ''
  selectedStatus.value = ''
  sortOption.value = 'category'
}

const colors = {
  'mysql': {
    color: '#006484',
    backgroundColor: 'rgba(0, 100, 132, 0.1)',
    borderColor: 'rgba(0, 100, 132, 0.2)'
  },
  'pgsql': {
    color: '#336699',
    backgroundColor: 'rgba(51, 102, 153, 0.1)',
    borderColor: 'rgba(51, 102, 153, 0.2)'
  },
  '后端': {
    color: '#009485',
    backgroundColor: 'rgba(0,148,133,0.1)',
    borderColor: 'rgba(0,148,133,0.2)'
  },
  '前端': {
    color: '#a855f7',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderColor: 'rgba(168, 85, 247, 0.2)'
  },
}

const handleCardClick = (item: PluginItem) => {
  if (item.link) {
    window.open(item.link, '_blank')
  }
}
</script>

<style scoped>
.market-layout {
  padding: 3rem 1rem;
  max-width: 1600px;
  margin: 0 auto;
}

.market-title {
  text-align: center;
  margin: 0 0 3rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.content-wrapper {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.filter-card {
  position: sticky;
  top: 6rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
  width: 320px;
  height: fit-content;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  flex-shrink: 0;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.header-buttons {
  display: flex;
  gap: 0.5rem;
}

.toggle-button {
  padding: 0.4rem 0.8rem;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-button:hover {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.filter-content {
  overflow: hidden;
}

.filter-content-enter-active,
.filter-content-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
}

.filter-content-enter-from,
.filter-content-leave-to {
  max-height: 0;
  opacity: 0;
}

@media (max-width: 767px) {
  .filter-card.collapsed {
    margin-bottom: 0;
  }
}

.filter-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.reset-button {
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.reset-button:hover {
  background-color: var(--vp-c-brand);
}

.filter-search {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.875rem;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand), 0.1);
  background: var(--vp-c-bg);
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  user-select: none;
}

.filter-badge:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.filter-badge.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand), 0.3);
}

.filter-badge input[type="radio"] {
  display: none;
}

.filter-badge span {
  font-weight: 500;
}

.plugin-section {
  flex: 1;
  min-width: 0;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.results-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.results-count {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

.results-count strong {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.plugin-card-container {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
}

.no-results-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.no-results h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 500;
}

.no-results p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.plugin-card {
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  border: 1px solid var(--vp-c-border);
  position: relative;
}

.plugin-card.clickable:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
}

.plugin-card.clickable {
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-content {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
  pointer-events: none;
}

.plugin-card.clickable:hover .image-content {
  transform: scale(1.02);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
}

.card-content {
  padding: 0.75rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: nowrap;
  width: 100%;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.4;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-title-link {
  flex-shrink: 0;
  display: flex;
  font-size: 1.5rem
}

.label-inline {
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  white-space: nowrap;
}

.card-description {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  margin-top: 0.5rem;
  flex: 1
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

.search-container {
  position: relative;
  width: 50%;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.875rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.expired-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.expired-overlay-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  pointer-events: none;
}

.expired-text {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 0 5px black;
}

@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }

  .filter-card {
    position: static;
    width: 100%;
    max-height: none;
    margin-bottom: 1.5rem;
  }

  .plugin-section {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .market-layout {
    padding: 1rem 0.5rem;
  }

  .market-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .filter-card {
    padding: 1rem;
    margin-bottom: -2rem;
    border-radius: 8px;
  }

  .filter-badges {
    gap: 0.4rem;
  }

  .filter-badge {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }

  .plugin-card-container {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }

  .results-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .plugin-card-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 1200px) {
  .plugin-card-container {
    grid-template-columns: repeat(v-bind('props.columns'), 1fr);
  }
}
</style>
