<template>
  <section class="feature-bento">
    <header class="fb-header">
      <h2 class="fb-title">企业级开发，开箱即用</h2>
      <p class="fb-subtitle">把企业级的「重」，拆成可装可拆的「轻」</p>
    </header>

    <div class="fb-grid">
      <article v-for="item in items" :key="item.key" class="fb-card"
        :class="`fb-card-${item.size} fb-card-${item.tone}`">
        <div class="fb-card-bg" aria-hidden="true"></div>
        <div class="fb-card-icon" :style="{ color: item.iconColor }">
          <img :src="item.icon" :alt="item.title" />
        </div>
        <div class="fb-card-body">
          <p class="fb-card-title">{{ item.title }}</p>
          <p class="fb-card-desc">{{ item.details }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  key: string
  title: string
  details: string
  icon: string
  iconColor: string
  size: 'flagship' | 'small'
  tone: 'brand' | 'violet' | 'rose' | 'amber' | 'sky' | 'emerald' | 'slate'
}

const ic = (name: string, color: string) =>
  `https://api.iconify.design/${name}.svg?color=${encodeURIComponent(color)}&width=64&height=64`

const items: Feature[] = [
  {
    key: 'stack',
    title: '现代技术栈',
    details: 'FastAPI · SQLAlchemy 2.0 · Pydantic v2 · Celery，全栈异步，生产可用',
    icon: ic('ph:stack-duotone', '#009485'),
    iconColor: '#009485',
    size: 'flagship',
    tone: 'brand',
  },
  {
    key: 'jwt',
    title: '高性能 JWT',
    details: '缓存 + 白名单加持的自研认证中间件',
    icon: ic('ph:shield-check-duotone', '#0ea5e9'),
    iconColor: '#0ea5e9',
    size: 'small',
    tone: 'sky',
  },
  {
    key: 'rbac',
    title: '高级权限控制',
    details: 'RBAC + 数据权限，颗粒度可调',
    icon: ic('ph:key-duotone', '#f59e0b'),
    iconColor: '#f59e0b',
    size: 'small',
    tone: 'amber',
  },
  {
    key: 'codegen',
    title: '内置代码生成器',
    details: '预览、写入、下载，一键告别重复 CV',
    icon: ic('ph:magic-wand-duotone', '#ec4899'),
    iconColor: '#ec4899',
    size: 'small',
    tone: 'rose',
  },
  {
    key: 'tz',
    title: '全局时区支持',
    details: '开箱即用的时区方案，告别时间错乱',
    icon: ic('ph:globe-duotone', '#0ea5e9'),
    iconColor: '#0ea5e9',
    size: 'small',
    tone: 'sky',
  },
  {
    key: 'docker',
    title: '一键容器部署',
    details: 'Docker Compose 编排就位，极速上线',
    icon: ic('ph:cloud-arrow-up-duotone', '#009485'),
    iconColor: '#009485',
    size: 'small',
    tone: 'emerald',
  },
]
</script>

<style scoped>
.feature-bento {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px;
}

.fb-header {
  text-align: center;
  margin-bottom: 36px;
}

.fb-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.fb-subtitle {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.fb-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 16px;
}

@media (max-width: 960px) {
  .fb-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .fb-grid {
    grid-template-columns: 1fr;
  }
}

.fb-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px 22px 20px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.fb-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px -14px rgba(0, 0, 0, 0.18);
}

.fb-card-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fb-card:hover .fb-card-bg {
  opacity: 1;
}

.fb-card-flagship {
  grid-column: span 2;
  grid-row: span 2;
  background: linear-gradient(135deg,
      color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg-soft)) 0%,
      var(--vp-c-bg-soft) 70%);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 22%, var(--vp-c-divider));
  padding: 32px 28px;
  justify-content: flex-end;
  min-height: 360px;
}

.fb-card-flagship:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  box-shadow: 0 12px 28px -16px rgba(0, 148, 133, 0.25);
}

.fb-card-flagship::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent), transparent 50%);
  pointer-events: none;
}

.fb-card-flagship .fb-card-title {
  font-size: 26px;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.fb-card-flagship .fb-card-desc {
  font-size: 15px;
  color: var(--vp-c-text-2);
  max-width: 90%;
}

.fb-card-flagship .fb-card-icon {
  width: 64px;
  height: 64px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 28%, transparent);
  border-radius: 16px;
  color: var(--vp-c-brand-1);
}

.fb-card-flagship .fb-card-icon img {
  width: 36px;
  height: 36px;
  filter: none;
}

@media (max-width: 600px) {
  .fb-card-flagship {
    grid-column: span 1;
    grid-row: auto;
    min-height: auto;
  }
}

.fb-card-icon {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.fb-card-icon img {
  width: 28px;
  height: 28px;
}

.fb-card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 1;
}

.fb-card-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  letter-spacing: -0.01em;
}

.fb-card-desc {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

.fb-card-emerald:hover {
  border-color: rgba(0, 148, 133, 0.45);
}

.fb-card-emerald .fb-card-bg {
  background: linear-gradient(135deg, rgba(0, 148, 133, 0.08), transparent 70%);
}

.fb-card-emerald .fb-card-icon {
  background: rgba(0, 148, 133, 0.1);
  border-color: rgba(0, 148, 133, 0.2);
}

.fb-card-violet:hover {
  border-color: rgba(124, 58, 237, 0.45);
}

.fb-card-violet .fb-card-bg {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.08), transparent 70%);
}

.fb-card-violet .fb-card-icon {
  background: rgba(124, 58, 237, 0.1);
  border-color: rgba(124, 58, 237, 0.2);
}

.fb-card-sky:hover {
  border-color: rgba(14, 165, 233, 0.45);
}

.fb-card-sky .fb-card-bg {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), transparent 70%);
}

.fb-card-sky .fb-card-icon {
  background: rgba(14, 165, 233, 0.1);
  border-color: rgba(14, 165, 233, 0.2);
}

.fb-card-amber:hover {
  border-color: rgba(245, 158, 11, 0.45);
}

.fb-card-amber .fb-card-bg {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08), transparent 70%);
}

.fb-card-amber .fb-card-icon {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.2);
}

.fb-card-rose:hover {
  border-color: rgba(236, 72, 153, 0.45);
}

.fb-card-rose .fb-card-bg {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.08), transparent 70%);
}

.fb-card-rose .fb-card-icon {
  background: rgba(236, 72, 153, 0.1);
  border-color: rgba(236, 72, 153, 0.2);
}

.fb-card-slate:hover {
  border-color: rgba(100, 116, 139, 0.45);
}

.fb-card-slate .fb-card-bg {
  background: linear-gradient(135deg, rgba(100, 116, 139, 0.08), transparent 70%);
}

.fb-card-slate .fb-card-icon {
  background: rgba(100, 116, 139, 0.1);
  border-color: rgba(100, 116, 139, 0.2);
}
</style>
