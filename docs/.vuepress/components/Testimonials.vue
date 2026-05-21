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
    role: '核心维护者 · fba',
    quote: 'fba 想解决的不是“怎么写一个接口”，而是团队真的开始协作后，那些权限、日志、分层、部署、可维护性问题。',
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
    role: '平台架构师 · 社区核心',
    quote: '最舒服的是边界感。API 处理协议，Service 写业务，CRUD/DAO 管数据访问，后面换人维护也能快速找到位置。',
    avatar: 'https://avatars.githubusercontent.com/u/110005582?v=4',
  },
  {
    name: 'imba',
    role: '全栈工程师 · 社区伙伴',
    quote: '插件市场这个方向很对，想加什么就装什么，不想用的时候也不会粘在主工程里。',
    avatar: 'https://avatars.githubusercontent.com/u/49424658?v=4',
  },
  {
    name: '向申',
    role: '运维开发 · 社区伙伴',
    quote: '有 Trace ID，排查问题少绕很多路。',
    avatar: 'https://avatars.githubusercontent.com/u/124766156?v=4',
  },
  {
    name: 'Meepo',
    role: '大数据运维 · 名誉成员',
    quote: '我更看重落地成本。Docker Compose、监控、日志这些东西先放好，后面从测试环境推到部署环境时，心里会踏实很多。',
    avatar: 'https://avatars.githubusercontent.com/u/63089130?v=4',
  },
  {
    name: 'taylortaurus',
    role: 'AI 工程师 · 社区用户',
    quote: '这根本不是写代码，这是在享受降维打击！优雅的架构配上神级插件生态，在 AI 的疯狂加持下，效率直接原地起飞，简直是后端的终极救星！',
    avatar: 'https://github.com/taylortaurus.png',
  },
  {
    name: 'huyuwei1996',
    role: '后端工程师 · 社区贡献者',
    quote: 'RBAC、JWT、缓存这些都有了，新项目不用先搭半天架子。',
    avatar: 'https://avatars.githubusercontent.com/u/20592484?v=4',
  },
  {
    name: 'yzbf-lin',
    role: '平台开发 · 社区伙伴',
    quote: '项目越往后写，越能感觉到统一分层的价值。不是每个人都按自己的习惯放代码，review 的时候也少很多“这个应该放哪”的讨论。',
    avatar: 'https://avatars.githubusercontent.com/u/72718331?v=4',
  },
  {
    name: 'IAseven',
    role: '全栈开发 · 社区伙伴',
    quote: '代码生成挺省心，尤其是后台管理这类重复模块。',
    avatar: 'https://avatars.githubusercontent.com/u/38178039?v=4',
  },
  {
    name: 'byte-voyager',
    role: '系统架构师 · 社区伙伴',
    quote: '它没有把架构做得很重，但该有的工程约束都在。对中后台、管理系统、内部平台这类项目来说，这个尺度刚好。',
    avatar: 'https://avatars.githubusercontent.com/u/16448666?v=4',
  },
  {
    name: 'AH-Toby',
    role: 'Python 开发 · 社区伙伴',
    quote: '目录结构一看就懂，少解释很多。',
    avatar: 'https://avatars.githubusercontent.com/u/35453550?v=4',
  },
  {
    name: 'yuWorm',
    role: '服务端工程师 · 社区伙伴',
    quote: 'MySQL、PostgreSQL 都照顾到了，再加上插件化扩展，后面业务变复杂也不至于把主工程越写越乱。',
    avatar: 'https://avatars.githubusercontent.com/u/34805071?v=4',
  },
  {
    name: 'SmallGarbage',
    role: '运维开发 · 社区伙伴',
    quote: '部署、排障、交接都比临时拼出来的 FastAPI 项目轻松。',
    avatar: 'https://avatars.githubusercontent.com/u/48581918?v=4',
  },
  {
    name: 'SoulEater',
    role: '后端工程师 · 社区伙伴',
    quote: '很多脚手架只管“跑起来”，fba 更像是把上线前会遇到的通用环节提前串了一遍。你可以不全用，但需要的时候它已经在那里。',
    avatar: 'https://avatars.githubusercontent.com/u/3403324?v=4',
  },
  {
    name: 'shj366',
    role: '独立开发者 · 社区伙伴',
    quote: 'LLMs 文档和 skills 对 AI 工具很友好。一个人做项目时，边写边问规范，确实能少踩坑。',
    avatar: 'https://avatars.githubusercontent.com/u/73154524?v=4',
  },
]

const rows = computed(() => {
  const rowCount = 2
  const rowSize = Math.ceil(items.length / rowCount)
  return Array.from({ length: rowCount }, (_, idx) =>
    items.slice(idx * rowSize, (idx + 1) * rowSize)
  ).filter(row => row.length > 0)
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
  animation: marquee-scroll 72s linear infinite;
  will-change: transform;
}

.t-row-left .t-track {
  animation-name: marquee-left;
}

.t-row-right .t-track {
  animation-name: marquee-right;
  animation-duration: 80s;
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
  gap: 18px;
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
