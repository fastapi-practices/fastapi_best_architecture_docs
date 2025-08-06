<template>
  <h1 class="market-title">插件市场</h1>
  <div class="search-container">
    <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 搜索插件..."
        class="search-input"
    />
  </div>
  <div class="plugin-card-container">
    <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="plugin-card"
        :class="{ 'clickable': item.link }"
        @click="handleCardClick(item)"
    >
      <div class="card-image">
        <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="image-content"
        />
        <div v-else class="image-placeholder">
          <Icon :name="item.icon" size="5em" color="var(--vp-c-text-1)" />
        </div>
        <div
            v-if="item.free?.valueOf() === false"
            class="price-corner-tag paid"
        >
          <span class="price-corner-text">Not Free</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-title-row">
          <img v-if="item.logo" :src="item.logo" class="logo" />
          <h3 class="card-title">{{ item.title }}</h3>
          <div class="card-title-link">
            <a
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
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
              :text="tag"
              :style="colors[tag]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.items
  }
  const query = searchQuery.value.toLowerCase().trim()
  return props.items.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

const colors = {
  'mysql': { color: '#006484', backgroundColor: 'rgba(0, 100, 132, 0.1)', borderColor: 'rgba(0, 100, 132, 0.2)' },
  'pgsql': {
    color: '#336699',
    backgroundColor: 'rgba(51, 102, 153, 0.1)',
    borderColor: 'rgba(51, 102, 153, 0.2)'
  },
  '后端': { color: '#009485', backgroundColor: 'rgba(0,148,133,0.1)', borderColor: 'rgba(0,148,133,0.2)' },
  '前端': { color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)' },
}

const handleCardClick = (item: PluginItem) => {
  if (item.link) {
    window.open(item.link, '_blank')
  }
}
</script>

<style scoped>
.plugin-card-container {
  display: grid;
  margin: 0 auto;
  max-width: 1200px;
  padding: 1rem;
}

.market-title {
  text-align: center;
  margin: 5rem 0 3rem;
}

.plugin-card {
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  max-height: 360px;
  border: 1px solid var(--vp-c-border);
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
  height: 140px;
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
  border-radius: 4px;
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

.price-corner-tag {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  padding: 0 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-bottom-left-radius: 4px;
  transform: translate(1px, -1px);
  z-index: 1;
}

.price-corner-tag.paid {
  background: #ff5733;
}

.price-corner-text {
  text-transform: uppercase;
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
  border-radius: 4px;
  font-size: 0.875rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

@media (max-width: 767px) {
  .plugin-card-container {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    padding: 0.5rem;
  }

  .card-image {
    height: 120px;
  }

  .search-container {
    width: 80%;
    max-width: none;
    margin-bottom: 1.5rem;
  }

  .market-title {
    margin: 2rem 0 1rem;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .plugin-card-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }

  .card-image {
    height: 160px;
  }

  .search-container {
    width: 50%;
    max-width: 600px;
  }
}

@media (min-width: 960px) {
  .plugin-card-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;
    padding: 1.5rem;
  }

  .card-image {
    height: 180px;
  }

  .search-container {
    width: 50%;
    max-width: 600px;
  }
}

@media (min-width: 1200px) {
  .plugin-card-container {
    grid-template-columns: repeat(v-bind('props.columns'), 1fr);
  }
}
</style>
