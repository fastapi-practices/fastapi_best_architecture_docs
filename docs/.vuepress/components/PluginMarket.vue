<template>
  <div class="plugin-card-container">
    <div
        v-for="(item, index) in items"
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
          <Icon :name="item.icon" size="3em" color="var(--vp-c-brand)" />
        </div>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-description">{{ item.description }}</p>
        <div class="card-tags">
          <span
              v-for="(tag, tagIndex) in item.tags"
              :key="tagIndex"
              class="badge"
              :style="getTagColors(tag)"
          >{{ tag }}</span>
        </div>
        <div class="card-footer">
          <div class="item-developer-info">
            <img
                :src="getGithubAvatarUrl(item.githubUser)"
                alt="Developer Avatar"
                class="developer-avatar"
            />
            <span class="developer-name">
              {{ item.githubUser }}
            </span>
          </div>
          <div v-if="!item.link" class="built-in-label">内置</div>
          <a
              v-else
              :href="item.link"
              class="github-link no-external-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub仓库"
              @click.stop
          >
            <Icon name="mdi:github" size="1.5em" color="var(--vp-c-text-2)" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

export interface PluginItem {
  icon: string
  title: string
  description: string
  tags: string[]
  link?: string
  image?: string
  githubUser: string
}

const props = withDefaults(
    defineProps<{
      items: PluginItem[]
      columns?: number
    }>(),
    {
      columns: 3
    }
)

interface TagColors {
  color?: string
  backgroundColor?: string
  borderColor?: string
}

const getTagColors = (tag: string): TagColors => {
  const colors: Record<string, TagColors> = {
    'MySQL': { color: '#006484', backgroundColor: 'rgba(0, 100, 132, 0.1)', borderColor: 'rgba(0, 100, 132, 0.2)' },
    'PostgreSQL': { color: '#336699', backgroundColor: 'rgba(51, 102, 153, 0.1)', borderColor: 'rgba(51, 102, 153, 0.2)' },
    'fba': { color: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.2)' },
    'fba_ui': { color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)' },
    'app': { color: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.1)', borderColor: 'rgba(249, 115, 22, 0.2)' },
    'extra': { color: '#64748b', backgroundColor: 'rgba(100, 116, 139, 0.1)', borderColor: 'rgba(100, 116, 139, 0.2)' },
    'pay': { color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' },
    'free': { color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }
  };
  return colors[tag] || {
    color: 'var(--vp-c-text-2)',
    backgroundColor: 'var(--vp-c-bg-soft)',
    borderColor: 'var(--vp-c-divider-light)'
  };
}

const getGithubAvatarUrl = (username: string) => {
  return `https://github.com/${username}.png?size=32`;
};

const handleCardClick = (item: PluginItem) => {
  if (item.link) {
    window.open(item.link, '_blank');
  }
};
</script>

<style scoped>
.plugin-card-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
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
  border: 1px solid var(--vp-c-divider);
}

.plugin-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
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
  border-bottom: 1px solid var(--vp-c-divider);
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
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.4rem 0;
  line-height: 1.4;
}

.card-description {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0 0 0.8rem 0;
  flex-grow: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid transparent;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.item-developer-info {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-grow: 1;
  min-width: 0;
}

.developer-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  cursor: default;
  pointer-events: none;
}

.developer-name {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.github-link {
  transition: all 0.2s ease;
  pointer-events: none;
}

.no-external-icon::after {
  content: none !important;
}

.built-in-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  padding: 0;
  border-radius: 0;
  flex-shrink: 0;
  margin-left: auto;
  white-space: nowrap;
  font-weight: 500;
}

@media (min-width: 768px) {
  .plugin-card-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }

  .card-image {
    height: 160px;
  }
}

@media (min-width: 960px) {
  .plugin-card-container {
    grid-template-columns: repeat(v-bind('props.columns'), 1fr);
    gap: 1.5rem;
  }

  .card-image {
    height: 180px;
  }
}
</style>
