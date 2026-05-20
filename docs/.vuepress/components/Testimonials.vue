<template>
  <section class="testimonials">
    <header class="t-header">
      <h2 class="t-title">社区在说</h2>
      <p class="t-subtitle">越来越多团队，选择 fba 构建下一代后端</p>
    </header>

    <div class="t-marquee">
      <div v-for="(row, rowIdx) in rows" :key="rowIdx" class="t-row"
        :class="rowIdx % 2 === 0 ? 't-row-left' : 't-row-right'">
        <div class="t-track">
          <article v-for="(item, idx) in [...row, ...row]" :key="`${rowIdx}-${idx}`" class="t-card"
            :aria-hidden="idx >= row.length ? 'true' : undefined">
            <div class="t-quote-mark">"</div>
            <p class="t-quote">{{ item.quote }}</p>
            <footer class="t-author">
              <img v-if="item.avatar" :src="item.avatar" :alt="item.name" class="t-avatar" loading="lazy" />
              <div class="t-author-meta">
                <span class="t-author-name">{{ item.name }}</span>
                <span class="t-author-role">{{ item.role }}</span>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Testimonial {
  name: string
  role: string
  quote: string
  avatar?: string
}

const items: Testimonial[] = [
  {
    name: 'wu-clan',
    role: '核心维护者 · FastAPI Practices',
    quote: 'fba 把 FastAPI 的灵活与企业级架构的严谨融为一体，团队不必再为基础设施反复造轮子。',
    avatar: 'https://avatars.githubusercontent.com/u/52145145?v=4',
  },
  {
    name: 'downdawn',
    role: 'AI 全干工程师 · 核心团队',
    quote: '三层架构 + 插件系统，让我把精力都还给业务，AI 加持下的节奏直接拉满。',
    avatar: 'https://avatars.githubusercontent.com/u/41266749?v=4',
  },
  {
    name: 'Davidduang',
    role: '社区核心 · 平台架构',
    quote: '从裸 FastAPI 迁过来，模型、CRUD、权限几乎不用再写，省下的时间够多发两个版本。',
    avatar: 'https://avatars.githubusercontent.com/u/110005582?v=4',
  },
  {
    name: 'imba',
    role: '全栈工程师 · 社区伙伴',
    quote: '插件市场让生态扩展像搭积木，分类清晰，按需安装零冲突。',
    avatar: 'https://avatars.githubusercontent.com/u/49424658?v=4',
  },
  {
    name: '向申',
    role: '运维开发 · 社区伙伴',
    quote: 'Trace ID 全链路日志，定位线上问题的速度比裸 FastAPI 快了一个量级。',
    avatar: 'https://avatars.githubusercontent.com/u/124766156?v=4',
  },
  {
    name: 'Meepo',
    role: '大数据运维 · 名誉团队',
    quote: '从 PoC 到生产部署只用了三天，Docker Compose 一键起飞，监控告警水到渠成。',
    avatar: 'https://avatars.githubusercontent.com/u/63089130?v=4',
  },
]

const rows = computed(() => {
  const half = Math.ceil(items.length / 2)
  return [items.slice(0, half), items.slice(half)]
})
</script>

<style scoped>
.testimonials {
  max-width: 1280px;
  margin: 0 auto;
  padding: 56px 24px;
}

.t-header {
  text-align: center;
  margin-bottom: 36px;
}

.t-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.t-subtitle {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.t-marquee {
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
}

.t-row {
  display: flex;
  overflow: hidden;
}

.t-track {
  display: flex;
  gap: 18px;
  width: max-content;
  animation: marquee-scroll 48s linear infinite;
  will-change: transform;
}

.t-row-left .t-track {
  animation-name: marquee-left;
}

.t-row-right .t-track {
  animation-name: marquee-right;
  animation-duration: 56s;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-50% - 9px));
  }
}

@keyframes marquee-right {
  0% {
    transform: translateX(calc(-50% - 9px));
  }

  100% {
    transform: translateX(0);
  }
}

.t-card {
  position: relative;
  flex: 0 0 auto;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 22px 22px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 560px) {
  .t-card {
    width: 290px;
  }
}

.t-quote-mark {
  position: absolute;
  top: -22px;
  right: 14px;
  font-size: 96px;
  line-height: 1;
  font-family: Georgia, serif;
  color: var(--vp-c-brand-soft);
  pointer-events: none;
  user-select: none;
}

.t-quote {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin: 0;
  position: relative;
  z-index: 1;
}

.t-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 4px;
}

.t-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-bg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.t-author-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.t-author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.t-author-role {
  font-size: 12px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
