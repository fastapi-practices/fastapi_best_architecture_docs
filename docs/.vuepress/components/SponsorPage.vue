<script setup lang="ts">
import { h, ref } from 'vue'

type SponsorTab = 'honor' | 'booth'
type SponsorIconName = 'alipay' | 'arrow-right' | 'check' | 'wechat'

const activeTab = ref<SponsorTab>('honor')

const tabs: { key: SponsorTab; label: string }[] = [
  { key: 'honor', label: '荣誉赞助' },
  { key: 'booth', label: '展位赞助' },
]

const paymentMethods = [
  {
    name: '微信赞助',
    icon: 'wechat' as SponsorIconName,
    image: 'https://github.com/wu-clan/picx-images-hosting/raw/master/pay/weixin_zs.jpg',
  },
  {
    name: '支付宝赞助',
    icon: 'alipay' as SponsorIconName,
    image: 'https://wu-clan.github.io/picx-images-hosting/pay/zfb.jpg',
  },
]

const boothPlans = [
  {
    name: '独家展位',
    status: '空缺',
    price: '沟通 / 月',
    placements: ['首页独家展示位', '文档左侧边栏独家展示位', '文档右侧边栏独家展示位', '博客右侧边栏独家展示位', '移动端可见'],
    material: '7:3 横版图，品牌名、Logo、链接',
  },
  {
    name: '金牌展位',
    status: '空缺',
    price: '沟通 / 月',
    placements: ['首页轮播固定展示位', '文档右侧边栏大号展示位'],
    material: '同独家',
  },
  {
    name: '银牌展位',
    status: '空缺',
    price: '沟通 / 月',
    placements: ['首页轮播滚动展示位', '文档右侧边栏小号展示位'],
    material: '5:3 横版图，品牌名、Logo、链接',
  },
]

function isBoothFull(plan: { status: string }) {
  return plan.status.includes('满')
}

const promotionRules = [
  '优先推广和程序员相关的互联网产品，比如：键盘、显示器、耳机、低代码开发平台、开发软件、云服务器、个人博客等等；如果与程序员无关，可酌情考虑',
  '拒绝一切违反法律法规、灰产相关的产品推广',
]

const announcementLines = [
  '感谢 xxx 老板对 fba 项目的慷慨赞助，以下是老板的产品，大家感兴趣的可以关注一下：',
  'xxx 商品名称',
  '链接：https://xxx.xx',
]

const iconPaths: Record<SponsorIconName, string[]> = {
  alipay: ['M5 4h14v16H5z', 'M8 15c3.8-.4 6.8-2 8-5', 'M9 9h6', 'M12 7v8', 'M8 16c2.8 1.4 5.6 1.4 8 0'],
  'arrow-right': ['M5 12h14', 'm13 6 6 6-6 6'],
  check: ['m5 12 4 4L19 6'],
  wechat: ['M10 6a6 5 0 0 0-6 5c0 1.7.9 3.2 2.4 4.1L6 18l2.8-1.5c.4.1.8.1 1.2.1a6 5 0 0 0 6-5 6 5 0 0 0-6-5.6Z', 'M14 10a5 4.2 0 0 1 5 4.2c0 1.4-.7 2.6-1.9 3.4l.3 2.4-2.3-1.2h-1.1a5 4.2 0 0 1-5-4.2'],
}

const SponsorIcon = (props: { name: SponsorIconName }) => h(
  'svg',
  {
    class: 'sponsor-icon',
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
  },
  iconPaths[props.name].map(path => h('path', {
    d: path,
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })),
)
</script>

<template>
  <main class="sponsor-page">
    <header class="page-header">
      <h1>赞助 fba</h1>
      <p>
        自 fba 创建以来，我们一直致力于
        <a href="https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/CHANGELOG.md" target="_blank" rel="noreferrer">持续更新</a>
        和
        <a href="./backend/summary/why.html#长期维护">积极维护</a>，为此，我们投入了大量的时间和无限的热爱。感谢您为 fba 给予的大力支持，您的每份鼓励都将成为我们继续前进的动力
      </p>
    </header>

    <nav class="sponsor-tabs" aria-label="赞助类型">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        :class="['tab-button', { active: activeTab === tab.key }]"
        :aria-selected="activeTab === tab.key"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </nav>

    <section v-show="activeTab === 'honor'" class="tab-panel" aria-labelledby="honor-title">
      <div class="section-title">
        <h2 id="honor-title">荣誉赞助</h2>
      </div>

      <div class="payment-grid">
        <article v-for="method in paymentMethods" :key="method.name" class="payment-card">
          <div class="card-title">
            <SponsorIcon :name="method.icon" />
            <h3>{{ method.name }}</h3>
          </div>
          <img :src="method.image" :alt="method.name" loading="lazy" />
        </article>

        <aside class="notice-card">
          <h3>说明</h3>
          <ul>
            <li>
              <SponsorIcon name="check" />
              <span>如果您已加入 Discord 社区，请私信作者并发送赞助截图，以获取专属身份标签</span>
            </li>
            <li>
              <SponsorIcon name="check" />
              <span>您的每一份支持都是我们持续前进的动力，期待未来能以更完善的方式回馈您的信任</span>
            </li>
          </ul>
          <a class="text-link" href="https://wu-clan.github.io/sponsor/" target="_blank" rel="noreferrer">
            其他赞助方式
            <SponsorIcon name="arrow-right" />
          </a>
        </aside>
      </div>

      <aside class="callout-card tip">
        <strong>提示:</strong>
        <span>如果您已加入 <a href="./group.html">Discord</a> 社区，请私信作者并发送赞助截图，以获取专属身份标签</span>
      </aside>
    </section>

    <section v-show="activeTab === 'booth'" class="tab-panel" aria-labelledby="booth-title">
      <div class="section-title with-action">
        <div>
          <h2 id="booth-title">展位赞助</h2>
          <p>适合希望触达 fba 文档读者的产品或服务。请先联系作者确认价格、排期和素材</p>
        </div>
        <a class="contact-button" href="./group.html">联系作者</a>
      </div>

      <div class="booth-grid">
        <article
          v-for="plan in boothPlans"
          :key="plan.name"
          class="booth-card"
          :class="{ 'is-full': isBoothFull(plan) }"
        >
          <div class="booth-head">
            <div>
              <span>{{ plan.status }}</span>
              <h3>{{ plan.name }}</h3>
            </div>
            <strong v-if="!isBoothFull(plan)">{{ plan.price }}</strong>
          </div>
          <ul class="check-list">
            <li v-for="placement in plan.placements" :key="placement">
              <SponsorIcon name="check" />
              <span>{{ placement }}</span>
            </li>
          </ul>
          <p class="material-line">素材：{{ plan.material }}</p>
        </article>
      </div>

      <div class="booth-footer">
        <aside class="callout-card promotion">
          <strong>推广:</strong>
          <div>
            <p>选择【独家展位、特别展位】赞助，可帮助您的产品在 Discord 社区和微信交流群以公告的形式进行推广一次</p>
            <ul class="plain-list">
              <li v-for="rule in promotionRules" :key="rule">{{ rule }}</li>
            </ul>
            <p>公告消息如下：（您也可以提供自定义非政治、非法律法规敏感的推广词/图片）</p>
            <pre class="announcement"><code>{{ announcementLines.join('\n') }}</code></pre>
          </div>
        </aside>

        <aside class="callout-card warning">
          <strong>注意:</strong>
          <span>由于当前所有展位赞助均为自愿支持性质，我们暂时无法为您提供发票开具服务，对此带来的不便深表歉意</span>
        </aside>

        <aside class="callout-card warning">
          <strong>警告:</strong>
          <span>展位转化效果可能因市场环境、受众行为等多种因素影响，我们无法保证确切的转化结果</span>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sponsor-page {
  --sponsor-brand: var(--vp-c-brand-1);
  --sponsor-brand-soft: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  --sponsor-ink: var(--vp-c-text-1);
  --sponsor-muted: var(--vp-c-text-2);
  --sponsor-card: var(--vp-c-bg);
  --sponsor-soft: var(--vp-c-bg-soft);
  --sponsor-line: var(--vp-c-divider);
  max-width: 980px;
  margin: 0 auto;
  padding: 48px 20px 72px;
  color: var(--sponsor-ink);
}

.sponsor-page *,
.sponsor-page *::before,
.sponsor-page *::after {
  box-sizing: border-box;
}

.sponsor-icon {
  flex: none;
  width: 1.08em;
  height: 1.08em;
}

.page-header {
  max-width: 720px;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  font-size: clamp(30px, 5vw, 44px);
  line-height: 1.16;
  letter-spacing: -0.03em;
}

.page-header p,
.section-title p,
.material-line {
  color: var(--sponsor-muted);
  line-height: 1.7;
}

.page-header p {
  margin: 14px 0 0;
  font-size: 16px;
}

.page-header a,
.callout-card a {
  color: var(--sponsor-brand);
  font-weight: 650;
  text-decoration: none;
}

.sponsor-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 26px;
  border: 1px solid var(--sponsor-line);
  border-radius: 12px;
  background: var(--sponsor-soft);
}

.tab-button {
  min-width: 112px;
  min-height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 9px;
  color: var(--sponsor-muted);
  background: transparent;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
}

.tab-button.active {
  color: var(--sponsor-brand);
  background: var(--sponsor-card);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}

.tab-panel {
  border: 1px solid var(--sponsor-line);
  border-radius: 20px;
  padding: 24px;
  background: var(--sponsor-card);
}

.section-title {
  max-width: 720px;
  margin-bottom: 20px;
}

.section-title h2 {
  margin: 0;
  font-size: clamp(22px, 3vw, 28px);
  line-height: 1.25;
}

.section-title p {
  margin: 10px 0 0;
  font-size: 15px;
}

.with-action {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  max-width: none;
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 220px)) minmax(240px, 1fr);
  gap: 16px;
  align-items: stretch;
}

.payment-card,
.notice-card,
.booth-card {
  border: 1px solid var(--sponsor-line);
  border-radius: 16px;
  background: var(--sponsor-soft);
}

.payment-card,
.notice-card {
  padding: 18px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--sponsor-brand);
}

.card-title h3,
.notice-card h3,
.booth-card h3 {
  margin: 0;
  color: var(--sponsor-ink);
}

.card-title h3 {
  font-size: 16px;
}

.payment-card img {
  display: block;
  width: 180px;
  max-width: 100%;
  aspect-ratio: 1;
  margin: 16px auto 0;
  border: 1px solid var(--sponsor-line);
  border-radius: 12px;
  object-fit: cover;
  background: #fff;
}

.callout-card {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 16px;
  padding: 14px 16px;
  border: 1px solid var(--sponsor-line);
  border-radius: 14px;
  color: var(--sponsor-ink);
  background: var(--sponsor-soft);
  font-size: 14px;
  line-height: 1.65;
}

.callout-card strong {
  flex: none;
  color: var(--sponsor-brand);
}

.callout-card p {
  margin: 0;
  color: var(--sponsor-ink);
}

.callout-card p + .plain-list,
.callout-card .plain-list + p {
  margin-top: 10px;
}

.callout-card.tip {
  border-color: color-mix(in srgb, var(--sponsor-brand) 30%, var(--sponsor-line));
  background: var(--sponsor-brand-soft);
}

.callout-card.warning {
  border-color: color-mix(in srgb, #eab308 36%, var(--sponsor-line));
  background: color-mix(in srgb, #eab308 10%, var(--sponsor-card));
}

.callout-card.warning strong {
  color: #ca8a04;
}

.notice-card ul,
.check-list,
.plain-list {
  padding: 0;
  margin: 14px 0 0;
  list-style: none;
}

.notice-card li,
.check-list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  color: var(--sponsor-ink);
  font-size: 14px;
  line-height: 1.6;
}

.notice-card li + li,
.check-list li + li,
.plain-list li + li {
  margin-top: 8px;
}

.notice-card svg,
.check-list svg {
  margin-top: 0.24em;
  color: var(--sponsor-brand);
}

.text-link,
.contact-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 40px;
  margin-top: 16px;
  padding: 0 15px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none !important;
}

.text-link {
  color: var(--sponsor-brand) !important;
  background: var(--sponsor-brand-soft);
}

.contact-button {
  flex: none;
  color: #fff !important;
  background: var(--sponsor-brand);
}

.booth-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.booth-card {
  display: flex;
  flex-direction: column;
  padding: 18px;
}

.booth-card:first-child {
  border-color: color-mix(in srgb, var(--sponsor-brand) 42%, var(--sponsor-line));
  background: linear-gradient(180deg, var(--sponsor-brand-soft), transparent 70%), var(--sponsor-soft);
}

.booth-card.is-full,
.booth-card.is-full:first-child {
  border-color: color-mix(in srgb, var(--sponsor-muted) 24%, var(--sponsor-line));
  background: color-mix(in srgb, var(--sponsor-soft) 72%, var(--sponsor-card));
}

.booth-card.is-full .booth-head span {
  color: var(--sponsor-muted);
  background: color-mix(in srgb, var(--sponsor-muted) 12%, transparent);
}

.booth-card.is-full .check-list svg {
  color: var(--sponsor-muted);
}

.booth-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.booth-head span {
  display: inline-flex;
  margin-bottom: 7px;
  padding: 2px 7px;
  border-radius: 999px;
  color: var(--sponsor-brand);
  background: var(--sponsor-brand-soft);
  font-size: 12px;
  font-weight: 700;
}

.booth-head strong {
  flex: none;
  color: var(--sponsor-brand);
  font-size: 13px;
}

.booth-card .check-list {
  padding-bottom: 12px;
}

.material-line {
  margin: auto 0 0;
  padding-top: 12px;
  border-top: 1px solid var(--sponsor-line);
  font-size: 13px;
}

.booth-footer {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 14px;
}

.booth-footer .callout-card {
  margin-top: 0;
}

.plain-list {
  color: var(--sponsor-muted);
  font-size: 14px;
  line-height: 1.65;
  list-style: disc;
  padding-left: 1.15em;
}

.announcement {
  margin: 12px 0 0;
  padding: 12px;
  overflow-x: auto;
  border: 1px solid var(--sponsor-line);
  border-radius: 10px;
  color: var(--sponsor-ink);
  background: var(--sponsor-card);
  font-size: 12px;
  line-height: 1.7;
  white-space: pre-wrap;
}

@media (max-width: 860px) {
  .payment-grid,
  .booth-grid,
  .booth-footer {
    grid-template-columns: 1fr;
  }

  .payment-card img {
    width: 200px;
  }

  .with-action {
    flex-direction: column;
  }
}

@media (max-width: 560px) {
  .sponsor-page {
    padding: 36px 14px 56px;
  }

  .sponsor-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }

  .tab-button,
  .contact-button,
  .text-link {
    width: 100%;
  }

  .tab-panel {
    padding: 18px;
  }
}
</style>
