<template>
  <div class="users-page">
    <header class="users-header">
      <h1 class="users-title">{{ t('usersPage.title') }}</h1>
      <p class="users-subtitle">{{ t('usersPage.subtitle') }}</p>
      <a class="users-cta" :href="registerHref" target="_blank" rel="noopener noreferrer">
        {{ t('usersPage.cta') }}
      </a>
    </header>

    <section v-for="group in groups" :key="group.key" class="users-section">
      <h2 class="users-section-title">{{ group.title }}</h2>
      <div v-if="group.items.length" class="users-grid">
        <a
          v-for="item in group.items"
          :key="group.key + '-' + item.name"
          class="user-card"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="user-top">
            <div class="user-logo">
              <img
                v-if="item.logo && !failedIcons.has(item.logo)"
                :src="item.logo"
                :alt="item.name"
                @error="failedIcons.add(item.logo)"
              />
              <span v-else class="user-logo-fallback">{{ item.name.charAt(0) }}</span>
            </div>
            <h3 class="user-name">{{ item.name }}</h3>
          </div>
          <p class="user-desc">{{ item.description }}</p>
        </a>
      </div>
      <p v-else class="users-empty">{{ t('usersPage.empty') }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useI18n } from '../composables/useI18n'

interface RegistryItem {
  name: string
  description: string
  url: string
  logo?: string
}

const { t, tm } = useI18n()
const registerHref = 'https://github.com/fastapi-practices/fastapi-best-architecture/issues/477'
const failedIcons = reactive(new Set<string>())

const groups = computed(() => [
  {
    key: 'projects',
    title: t('usersPage.projectSection'),
    items: (tm('usersPage.projects') || []) as RegistryItem[],
  },
  {
    key: 'organizations',
    title: t('usersPage.orgSection'),
    items: (tm('usersPage.organizations') || []) as RegistryItem[],
  },
])
</script>

<style scoped>
.users-page {
  --users-brand: var(--vp-c-brand-1);
  max-width: 880px;
  margin: 0 auto;
  padding: 48px 20px 72px;
}

.users-header {
  max-width: 640px;
  margin: 0 auto 40px;
  text-align: center;
}

.users-title {
  margin: 0;
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
}

.users-subtitle {
  margin: 14px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.users-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  background: var(--users-brand);
  color: #fff !important;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none !important;
}

.users-cta:hover {
  filter: brightness(1.06);
}

.users-section + .users-section {
  margin-top: 32px;
}

.users-section-title {
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.users-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.user-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: inherit;
  transition: border-color 0.15s ease;
}

.user-card:hover {
  border-color: color-mix(in srgb, var(--users-brand) 40%, var(--vp-c-divider));
}

.user-top {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.user-logo {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.user-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;
}

.user-logo-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background: var(--users-brand);
}

.user-name {
  margin: 0;
  min-width: 0;
  font-size: 16px;
  font-weight: 650;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
}

.user-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

.users-empty {
  margin: 0;
  padding: 22px 16px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  font-size: 14px;
  color: var(--vp-c-text-3);
  text-align: center;
}

@media (max-width: 767px) {
  .users-page {
    padding: 36px 16px 56px;
  }

  .user-card {
    padding: 12px;
  }
}
</style>
