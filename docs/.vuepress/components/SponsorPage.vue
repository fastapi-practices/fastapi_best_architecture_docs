<script setup lang="ts">
import { computed, h, onBeforeUnmount, ref } from 'vue'
import { withBase } from 'vuepress/client'
import { useI18n } from '../composables/useI18n'

type SponsorTab = 'honor' | 'booth'
type SponsorIconName = 'alipay' | 'wechat' | 'arrow-right' | 'check' | 'copy' | 'sponsor'
type SnippetKey = 'promotion' | 'inquiry'

interface BoothPlan {
  key: string
  name: string
  status: 'vacant' | 'full' | string
  price: string
  quota?: string
  placements: string[]
  material: string
}

const { t, tm, withLocale } = useI18n()

const activeTab = ref<SponsorTab>('honor')
const copiedSnippet = ref<SnippetKey | ''>('')
let copiedSnippetTimer: ReturnType<typeof setTimeout> | null = null

const tabs = computed(() => [
  { key: 'honor' as const, label: t('sponsors.honorTab') },
  { key: 'booth' as const, label: t('sponsors.boothTab') },
])

const paymentMethods = computed(() => [
  {
    name: t('sponsors.wechat'),
    icon: 'wechat' as SponsorIconName,
    image: 'https://wu-clan.github.io/picx-images-hosting/pay/weixin_zs.jpg',
  },
  {
    name: t('sponsors.alipay'),
    icon: 'alipay' as SponsorIconName,
    image: 'https://wu-clan.github.io/picx-images-hosting/pay/zfb.jpg',
  },
  {
    name: t('sponsors.other'),
    icon: 'sponsor' as SponsorIconName,
    link: 'https://wu-clan.github.io/sponsor/',
    linkText: t('sponsors.other'),
  },
])

const boothPlans = computed(() => tm<BoothPlan[]>('sponsors.booths') || [])
const promotionRules = computed(() => tm<string[]>('sponsors.promotionRules') || [])
const inquiryLines = computed(() => tm<string[]>('sponsors.inquiryLines') || [])
const announcementLines = computed(() => tm<string[]>('sponsors.announcementLines') || [])

const whyLink = computed(() =>
  withBase(withLocale(`/backend/summary/why.html#${t('sponsors.whyAnchor')}`)),
)
const groupLink = computed(() => withBase(withLocale('/group.html')))

function isBoothFull(plan: BoothPlan) {
  return plan.status === 'full'
}

function statusLabel(plan: BoothPlan) {
  return plan.status === 'full' ? t('sponsors.statusFull') : t('sponsors.statusVacant')
}

const sponsorEmail = 'jianhengwu0407@gmail.com'
const sponsorMailto = computed(() =>
  `mailto:${sponsorEmail}?subject=${encodeURIComponent(t('sponsors.mailSubject'))}&body=${encodeURIComponent(inquiryLines.value.join('\n'))}`,
)

const iconPaths: Record<SponsorIconName, string[]> = {
  alipay: ['M5 4h14v16H5z', 'M8 15c3.8-.4 6.8-2 8-5', 'M9 9h6', 'M12 7v8', 'M8 16c2.8 1.4 5.6 1.4 8 0'],
  wechat: ['M10 6a6 5 0 0 0-6 5c0 1.7.9 3.2 2.4 4.1L6 18l2.8-1.5c.4.1.8.1 1.2.1a6 5 0 0 0 6-5 6 5 0 0 0-6-5.6Z', 'M14 10a5 4.2 0 0 1 5 4.2c0 1.4-.7 2.6-1.9 3.4l.3 2.4-2.3-1.2h-1.1a5 4.2 0 0 1-5-4.2'],
  'arrow-right': ['M5 12h14', 'm13 6 6 6-6 6'],
  check: ['m5 12 4 4L19 6'],
  copy: ['M8 8h10v10H8z', 'M5 16H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1'],
  sponsor: ['M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z'],
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

const copySnippet = async (key: SnippetKey, lines: string[]) => {
  const text = lines.join('\n')

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    copiedSnippet.value = key

    if (copiedSnippetTimer) clearTimeout(copiedSnippetTimer)
    copiedSnippetTimer = setTimeout(() => {
      copiedSnippet.value = ''
      copiedSnippetTimer = null
    }, 1800)
  } catch (e) {
    console.warn('Copy sponsor snippet failed:', e)
  }
}

onBeforeUnmount(() => {
  if (copiedSnippetTimer) clearTimeout(copiedSnippetTimer)
})
</script>

<template>
  <main class="sponsor-page">
    <header class="page-header">
      <h1>{{ t('sponsors.title') }}</h1>
      <p>
        {{ t('sponsors.introBefore') }}
        <a href="https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/CHANGELOG.md"
          target="_blank" rel="noreferrer">{{ t('sponsors.continuousUpdates') }}</a>
        {{ t('sponsors.introAnd') }}
        <a :href="whyLink">{{ t('sponsors.activeMaintenance') }}</a>{{ t('sponsors.introAfter') }}
      </p>
    </header>

    <nav class="sponsor-tabs" :aria-label="t('sponsors.tabsAria')">
      <button v-for="tab in tabs" :key="tab.key" type="button"
        :class="['tab-button', { active: activeTab === tab.key }]" :aria-selected="activeTab === tab.key"
        @click="activeTab = tab.key">
        {{ tab.label }}
      </button>
    </nav>

    <section v-show="activeTab === 'honor'" class="tab-panel" aria-labelledby="honor-title">
      <div class="section-title">
        <h2 id="honor-title">{{ t('sponsors.honorTitle') }}</h2>
      </div>

      <div class="payment-grid">
        <article v-for="method in paymentMethods" :key="method.name" class="payment-card">
          <div class="card-title">
            <SponsorIcon :name="method.icon" />
            <h3>{{ method.name }}</h3>
          </div>
          <img v-if="method.image" :src="method.image" :alt="method.name" loading="lazy" />
          <a v-else-if="method.link" :href="method.link" target="_blank" rel="noreferrer" class="payment-link">
            {{ method.linkText || t('sponsors.otherFallback') }}
            <SponsorIcon name="arrow-right" />
          </a>
        </article>
      </div>

      <aside class="callout-card tip">
        <strong>{{ t('sponsors.tipLabel') }}</strong>
        <span>{{ t('sponsors.tipBefore') }} <a :href="groupLink">Discord</a> {{ t('sponsors.tipAfter') }}</span>
      </aside>
    </section>

    <section v-show="activeTab === 'booth'" class="tab-panel" aria-labelledby="booth-title">
      <div class="section-title with-action">
        <div>
          <h2 id="booth-title">{{ t('sponsors.boothTitle') }}</h2>
          <p>{{ t('sponsors.boothDesc') }}</p>
        </div>
        <a class="contact-button" :href="sponsorMailto">{{ t('sponsors.contactEmail') }}</a>
      </div>

      <div class="booth-grid">
        <article v-for="plan in boothPlans" :key="plan.key || plan.name" class="booth-card"
          :class="{ 'is-full': isBoothFull(plan) }">
          <div class="booth-head">
            <div>
              <div class="booth-badges">
                <span>{{ statusLabel(plan) }}</span>
                <span v-if="plan.quota" class="booth-quota">{{ plan.quota }}</span>
              </div>
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
          <p class="material-line">{{ t('sponsors.materialPrefix') }}{{ plan.material }}</p>
        </article>
      </div>

      <div class="booth-footer">
        <aside class="callout-card promotion">
          <strong>{{ t('sponsors.promotionLabel') }}</strong>
          <div>
            <p>{{ t('sponsors.promotionDesc') }}</p>
            <ul class="plain-list">
              <li v-for="rule in promotionRules" :key="rule">{{ rule }}</li>
            </ul>
            <p>{{ t('sponsors.announcementHint') }}</p>
            <div class="snippet-block">
              <button type="button" class="snippet-copy" :class="{ copied: copiedSnippet === 'promotion' }"
                :aria-label="copiedSnippet === 'promotion' ? t('sponsors.copiedAnnouncement') : t('sponsors.copyAnnouncement')"
                :title="copiedSnippet === 'promotion' ? t('sponsors.copied') : t('sponsors.copy')"
                @click="copySnippet('promotion', announcementLines)">
                <SponsorIcon name="copy" />
              </button>
              <pre class="announcement"><code>{{ announcementLines.join('\n') }}</code></pre>
            </div>
          </div>
        </aside>

        <aside class="callout-card inquiry">
          <strong>{{ t('sponsors.inquiryLabel') }}</strong>
          <div>
            <p>{{ t('sponsors.inquiryDesc') }}</p>
            <div class="snippet-block">
              <button type="button" class="snippet-copy" :class="{ copied: copiedSnippet === 'inquiry' }"
                :aria-label="copiedSnippet === 'inquiry' ? t('sponsors.copiedInquiry') : t('sponsors.copyInquiry')"
                :title="copiedSnippet === 'inquiry' ? t('sponsors.copied') : t('sponsors.copy')"
                @click="copySnippet('inquiry', inquiryLines)">
                <SponsorIcon name="copy" />
              </button>
              <pre class="announcement"><code>{{ inquiryLines.join('\n') }}</code></pre>
            </div>
          </div>
        </aside>

        <aside class="callout-card notice">
          <strong>{{ t('sponsors.noticeLabel') }}</strong>
          <span>{{ t('sponsors.noticeText') }}</span>
        </aside>

        <aside class="callout-card warning">
          <strong>{{ t('sponsors.warningLabel') }}</strong>
          <span>{{ t('sponsors.warningText') }}</span>
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
  width: 100%;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}

.payment-card,
.booth-card {
  border: 1px solid var(--sponsor-line);
  border-radius: 16px;
  background: var(--sponsor-soft);
}

.payment-card {
  padding: 18px;
}

.payment-card {
  display: flex;
  flex-direction: column;
}

.payment-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 16px auto 0;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  color: var(--sponsor-brand) !important;
  background: var(--sponsor-brand-soft);
  border-radius: 10px;
  text-decoration: none !important;
  width: 180px;
  max-width: 100%;
  aspect-ratio: 1;
  flex-direction: column;
  transition: transform 0.2s ease, background 0.2s ease;
}

.payment-link:hover {
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--sponsor-brand) 18%, transparent);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--sponsor-brand);
}

.card-title h3,
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

.callout-card>div {
  flex: 1;
  min-width: 0;
}

.callout-card p+.plain-list,
.callout-card .plain-list+p {
  margin-top: 10px;
}

.callout-card.tip {
  border-color: color-mix(in srgb, var(--sponsor-brand) 30%, var(--sponsor-line));
  background: var(--sponsor-brand-soft);
}

.callout-card.notice {
  border-color: color-mix(in srgb, #eab308 36%, var(--sponsor-line));
  background: color-mix(in srgb, #eab308 10%, var(--sponsor-card));
}

.callout-card.notice strong {
  color: #ca8a04;
}

.callout-card.warning {
  border-color: color-mix(in srgb, #dc2626 38%, var(--sponsor-line));
  background: color-mix(in srgb, #dc2626 10%, var(--sponsor-card));
}

.callout-card.warning strong {
  color: #dc2626;
}

.callout-card.inquiry {
  border-color: color-mix(in srgb, var(--sponsor-brand) 28%, var(--sponsor-line));
  background: var(--sponsor-brand-soft);
}

.check-list,
.plain-list {
  padding: 0;
  margin: 14px 0 0;
  list-style: none;
}

.check-list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  color: var(--sponsor-ink);
  font-size: 14px;
  line-height: 1.6;
}

.check-list li+li,
.plain-list li+li {
  margin-top: 8px;
}

.check-list svg {
  margin-top: 0.24em;
  color: var(--sponsor-brand);
}

.contact-button {
  flex: none;
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

.booth-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 7px;
}

.booth-head span {
  display: inline-flex;
  padding: 2px 7px;
  border-radius: 999px;
  color: var(--sponsor-brand);
  background: var(--sponsor-brand-soft);
  font-size: 12px;
  font-weight: 700;
}

.booth-head .booth-quota {
  color: #7c3aed;
  background: color-mix(in srgb, #7c3aed 12%, transparent);
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

.snippet-block {
  position: relative;
  margin: 12px 0 0;
  overflow: hidden;
  width: 100%;
  border: 1px solid var(--sponsor-line);
  border-radius: 10px;
  background: var(--sponsor-card);
}

.snippet-copy {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--sponsor-line);
  border-radius: 7px;
  color: var(--sponsor-muted);
  background: color-mix(in srgb, var(--sponsor-muted) 8%, var(--sponsor-card));
  cursor: pointer;
  transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}

.snippet-copy .sponsor-icon {
  width: 14px;
  height: 14px;
}

.snippet-copy:hover,
.snippet-copy.copied {
  color: var(--sponsor-ink);
  background: color-mix(in srgb, var(--sponsor-muted) 12%, var(--sponsor-card));
  border-color: color-mix(in srgb, var(--sponsor-muted) 30%, var(--sponsor-line));
}

.announcement {
  margin: 0;
  padding: 12px 48px 12px 12px;
  overflow-x: auto;
  color: var(--sponsor-ink);
  background: transparent;
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
    width: 100%;
  }

  .tab-button,
  .contact-button {
    width: 100%;
  }

  .tab-panel {
    padding: 18px;
  }
}
</style>
