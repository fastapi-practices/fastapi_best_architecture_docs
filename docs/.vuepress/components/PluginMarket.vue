<template>
  <div class="plugin-card-container">
    <div v-for="(item, index) in items" :key="index" class="plugin-card">
      <div class="card-image">
        <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="image-content"
        >
        <div v-else class="image-placeholder">
          <VPIconify
              :name="item.icon"
              size="3em"
              color="var(--vp-c-brand)"
          />
        </div>
      </div>
      <div class="card-content">
        <div class="card-header">
          <div class="card-title-group">
            <h3 class="card-title">{{ item.title }}</h3>
          </div>

          <a
              v-if="item.link"
              :href="item.link"
              class="github-link no-external-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub仓库"
          >
            <VPIconify name="mdi:github" size="2em" color="var(--vp-c-text-2)" />
          </a>
          <div v-else class="built-in-label">
            内置
          </div>
        </div>
        <p class="card-description">{{ item.description }}</p>
        <div class="card-tags">
          <Badge
              v-for="(tag, tagIndex) in item.tags"
              :key="tagIndex"
              :text="tag"
              v-bind="getTagColors(tag)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VPIconify from 'vuepress-theme-plume/components/VPIconify.vue'


export interface PluginItem {
  icon: string
  title: string
  description: string
  tags: string[]
  link?: string
  image?: string
}

const props = withDefaults(defineProps<{
  items: PluginItem[]
  columns?: number
}>(), {
  columns: 3
})

interface TagColors {
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

const getTagColors = (tag: string): TagColors => {
  const colors: Record<string, TagColors> = {
    'MySQL': { color: '#006484', bgColor: 'rgba(0, 100, 132, 0.1)', borderColor: 'rgba(0, 100, 132, 0.2)' },
    'PostgreSQL': { color: '#336699', bgColor: 'rgba(51, 102, 153, 0.1)', borderColor: 'rgba(51, 102, 153, 0.2)' },
    'fba': { color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)' },
    'fba_ui': { color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)' },
    'app': { color: '#f97316', bgColor: 'rgba(249, 115, 22, 0.1)', borderColor: 'rgba(249, 115, 22, 0.2)' },
    'extra': { color: '#64748b', bgColor: 'rgba(100, 116, 139, 0.1)', borderColor: 'rgba(100, 116, 139, 0.2)' },
    'pay': { color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' },
    'free': { color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }
  };
  return colors[tag] || {
    color: 'var(--vp-c-text-2)',
    bgColor: 'var(--vp-c-bg-soft)',
    borderColor: 'var(--vp-c-divider-light)'
  };
}
</script>

<style scoped>
.plugin-card-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);
}

.plugin-card {
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  border: 1px solid var(--vp-c-divider);
}

.plugin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
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
  transition: transform 0.5s ease;
}

.plugin-card:hover .image-content {
  transform: scale(1.05);
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
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
}

.card-title-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;
  min-width: 0;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.github-link {
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem;
  border-radius: 6px;
  flex-shrink: 0;
}

.github-link:hover {
  background-color: var(--vp-c-bg-soft);
}

.github-link:hover :deep(.iconify-svg) {
  color: var(--vp-c-brand);
  transform: scale(1.1);
}

.no-external-icon {
  display: inline-flex;
  align-items: center;
}

.no-external-icon::after {
  content: none !important;
}

.built-in-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  background-color: var(--vp-c-bg-soft);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  flex-shrink: 0;
  margin-left: auto;
}

.card-description {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0.5rem 0 1rem;
  flex-grow: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

@media (min-width: 768px) {
  .plugin-card-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-image {
    height: 180px;
  }
}

@media (min-width: 960px) {
  .plugin-card-container {
    grid-template-columns: repeat(v-bind('props.columns'), 1fr);
  }

  .card-image {
    height: 200px;
  }
}
</style>
