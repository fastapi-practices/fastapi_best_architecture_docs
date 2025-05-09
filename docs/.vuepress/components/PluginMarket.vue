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
          <Icon :name="item.icon" size="3em" color="var(--vp-c-text-1)" />
        </div>
        <div v-if="item.priceLabel" class="price-corner-tag" :class="{ 'paid': item.priceLabel === '付费' }">
          <span class="price-corner-text">{{ item.priceLabel }}</span>
        </div>
        <div class="image-footer">
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
          <a
              v-if="item.link"
              :href="item.link"
              class="no-external-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub仓库"
              @click.stop
          >
            <Icon name="mdi:github" size="1.1em" color="var(--vp-c-text-2)" />
          </a>
          <span v-else class="built-in-label-inline">内置</span>
        </div>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ item.title }}</h3>
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
export interface PluginItem {
  icon: string
  title: string
  description: string
  tags: string[]
  link?: string
  image?: string
  githubUser: string
  priceLabel?: '免费' | '付费'
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

const colors: Record<string, TagColors> = {
  'MySQL': { color: '#006484', backgroundColor: 'rgba(0, 100, 132, 0.1)', borderColor: 'rgba(0, 100, 132, 0.2)' },
  'PostgreSQL': {
    color: '#336699',
    backgroundColor: 'rgba(51, 102, 153, 0.1)',
    borderColor: 'rgba(51, 102, 153, 0.2)'
  },
  '后端': { color: '#009485', backgroundColor: 'rgba(0,148,133,0.1)', borderColor: 'rgba(0,148,133,0.2)' },
  '前端': { color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)' },
};

const getGithubAvatarUrl = (username: string) => {
  return `https://github.com/${ username }.png?size=32`;
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
  max-height: 360px;
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
  height: 180px;
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

.image-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
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

.no-external-icon::after {
  content: none !important;
}

.built-in-label-inline {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-border);
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  margin-left: 0.5rem;
  white-space: nowrap;
  font-weight: 500;
}

.card-content {
  padding: 0.75rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.card-description {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
  flex-grow: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.price-corner-tag {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  border-bottom-left-radius: 4px;
  transform: translate(1px, -1px);
  z-index: 1;
}

.price-corner-tag {
  background: #17bf63;
}

.price-corner-tag.paid {
  background: #ff5733;
}

.price-corner-text {
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .plugin-card-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }

  .card-image {
    height: 200px;
  }

  .card-content {
    padding: 0.75rem;
  }
}

@media (min-width: 960px) {
  .plugin-card-container {
    grid-template-columns: repeat(v-bind('props.columns'), 1fr);
    gap: 1.5rem;
  }

  .card-image {
    height: 220px;
  }

  .card-content {
    padding: 0.75rem;
  }
}
</style>