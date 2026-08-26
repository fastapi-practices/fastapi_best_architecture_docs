<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vuepress/client'
import { useI18n } from '../composables/useI18n'
import {
  boothCapacity,
  getBoothAspectRatio,
  getBoothOccupiedCount,
  getRecommendedBoothKey,
  isBoothFull,
} from '../data/sponsors'

type SponsorTab = 'honor' | 'booth'
type SponsorIconName = 'alipay' | 'wechat' | 'arrow-right' | 'check' | 'copy' | 'sponsor'
type SnippetKey = 'promotion'

interface BoothPlan {
  key: string
  name: string
  price: string
  quota?: string
  placements: string[]
}

interface AudienceItem {
  value: string
  label: string
}

interface PlacementItem {
  key: string
  title: string
  desc: string
}

interface FaqItem {
  q: string
  a: string
}

const { t, tm, withLocale } = useI18n()

const activeTab = ref<SponsorTab>('booth')
const copiedSnippet = ref<SnippetKey | ''>('')
let copiedSnippetTimer: ReturnType<typeof setTimeout> | null = null

const tabs = computed(() => [
  { key: 'booth' as const, label: t('sponsors.boothTab') },
  { key: 'honor' as const, label: t('sponsors.honorTab') },
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
const inquiryLines = computed(() => tm<string[]>('sponsors.inquiryLines') || [])
const announcementLines = computed(() => tm<string[]>('sponsors.announcementLines') || [])
const audience = computed(() => tm<AudienceItem[]>('sponsors.audience') || [])
const placements = computed(() => tm<PlacementItem[]>('sponsors.placements') || [])
const faqItems = computed(() => tm<FaqItem[]>('sponsors.faq') || [])
const recommendedKey = computed(() => getRecommendedBoothKey())

const whyLink = computed(() =>
  withBase(withLocale(`/backend/summary/why.html#${t('sponsors.whyAnchor')}`)),
)
const groupLink = computed(() => withBase(withLocale('/group.html')))

function statusLabel(plan: BoothPlan) {
  return isBoothFull(plan.key) ? t('sponsors.statusFull') : t('sponsors.statusVacant')
}

function remainingLabel(plan: BoothPlan) {
  const cap = boothCapacity[plan.key as keyof typeof boothCapacity]
  if (!cap) return t('sponsors.unlimited')
  const used = getBoothOccupiedCount(plan.key)
  if (used >= cap) return t('sponsors.statusFull')
  return t('sponsors.remaining', { n: cap - used, cap })
}

function materialLabel(plan: BoothPlan) {
  const ratio = getBoothAspectRatio(plan.key)
  return ratio ? t('sponsors.materialText', { ratio }) : ''
}

const sponsorEmail = 'jianhengwu0407@gmail.com'

function inquiryLinesFor(plan?: BoothPlan) {
  const lines = [...inquiryLines.value]
  if (!plan) return lines
  return lines.map((line) => {
    if (line.startsWith('意向档位')) return `意向档位：${plan.name}`
    if (line.startsWith('Preferred tier')) return `Preferred tier: ${plan.name}`
    return line
  })
}

function planMailto(plan?: BoothPlan) {
  const subject = plan
    ? t('sponsors.mailSubjectTier', { name: plan.name })
    : t('sponsors.mailSubject')
  return `mailto:${sponsorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryLinesFor(plan).join('\n'))}`
}

const sponsorMailto = computed(() => planMailto())

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

function tabFromHash(): SponsorTab {
  if (typeof window === 'undefined') return 'booth'
  return window.location.hash.replace(/^#/, '') === 'honor' ? 'honor' : 'booth'
}

function setTab(tab: SponsorTab) {
  activeTab.value = tab
  if (typeof window === 'undefined') return
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${tab}`)
}

function onHashChange() {
  activeTab.value = tabFromHash()
}

onMounted(() => {
  activeTab.value = tabFromHash()
  window.addEventListener('hashchange', onHashChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', onHashChange)
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

    <ul class="audience-grid" :aria-label="t('sponsors.audienceAria')">
      <li v-for="item in audience" :key="item.label">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </li>
    </ul>

    <nav class="sponsor-tabs" :aria-label="t('sponsors.tabsAria')">
      <button v-for="tab in tabs" :key="tab.key" type="button"
        :class="['tab-button', { active: activeTab === tab.key }]" :aria-selected="activeTab === tab.key"
        @click="setTab(tab.key)">
        {{ tab.label }}
      </button>
    </nav>

    <section v-show="activeTab === 'booth'" id="booth" class="tab-panel" aria-labelledby="booth-title">
      <div class="section-title with-action">
        <div>
          <h2 id="booth-title">{{ t('sponsors.boothTitle') }}</h2>
          <p>{{ t('sponsors.boothDesc') }}</p>
        </div>
        <div class="section-actions">
          <a class="contact-button" :href="sponsorMailto">{{ t('sponsors.contactEmail') }}</a>
        </div>
      </div>

      <div class="booth-grid">
        <article v-for="plan in boothPlans" :key="plan.key || plan.name" class="booth-card"
          :class="{ 'is-full': isBoothFull(plan.key), 'is-recommended': recommendedKey === plan.key && !isBoothFull(plan.key) }">
          <div class="booth-head">
            <div>
              <div class="booth-badges">
                <span>{{ statusLabel(plan) }}</span>
                <span class="booth-quota">{{ remainingLabel(plan) }}</span>
              </div>
              <h3>{{ plan.name }}</h3>
            </div>
            <strong v-if="!isBoothFull(plan.key)">{{ plan.price }}</strong>
          </div>
          <ul class="check-list">
            <li v-for="placement in plan.placements" :key="placement">
              <SponsorIcon name="check" />
              <span>{{ placement }}</span>
            </li>
          </ul>
          <p v-if="materialLabel(plan)" class="material-line">{{ t('sponsors.materialPrefix') }}{{ materialLabel(plan) }}</p>
          <a v-if="!isBoothFull(plan.key)" class="contact-button booth-cta" :href="planMailto(plan)">
            {{ t('sponsors.inquireTier') }}
          </a>
          <p v-else class="tier-full">{{ t('sponsors.tierFull') }}</p>
        </article>
      </div>

      <section class="placement-section" aria-labelledby="placement-title">
        <div class="section-title">
          <h2 id="placement-title">{{ t('sponsors.placementTitle') }}</h2>
          <p>{{ t('sponsors.placementDesc') }}</p>
        </div>
        <div class="placement-grid">
          <article v-for="item in placements" :key="item.key" class="placement-card">
            <div class="placement-preview" :class="`placement-${item.key}`" aria-hidden="true">
              <span class="mock-bar"></span>
              <span class="mock-ad"></span>
              <span class="mock-line"></span>
              <span class="mock-line short"></span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </article>
        </div>
      </section>

      <div class="booth-footer">
        <aside class="callout-card promotion">
          <strong>{{ t('sponsors.promotionLabel') }}</strong>
          <div>
            <p>{{ t('sponsors.promotionDesc') }}</p>
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

        <section class="faq-list" aria-labelledby="faq-title">
          <h2 id="faq-title">{{ t('sponsors.faqTitle') }}</h2>
          <VPCollapse>
            <VPCollapseItem v-for="(item, index) in faqItems" :key="item.q" :index="index">
              <template #title>{{ item.q }}</template>
              <p>{{ item.a }}</p>
            </VPCollapseItem>
          </VPCollapse>
        </section>
      </div>
    </section>

    <section v-show="activeTab === 'honor'" id="honor" class="tab-panel" aria-labelledby="honor-title">
      <div class="section-title">
        <h2 id="honor-title">{{ t('sponsors.honorTitle') }}</h2>
        <p>{{ t('sponsors.honorIntro') }}</p>
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

.sponsor-page .audience-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  align-items: stretch;
  margin: 0 0 26px;
  padding: 0;
  list-style: none;
}

.sponsor-page .audience-grid li,
.sponsor-page .audience-grid li + li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 88px;
  margin: 0;
  padding: 16px 14px;
  border: 1px solid var(--sponsor-line);
  border-radius: 14px;
  background: var(--sponsor-soft);
}

.sponsor-page .audience-grid strong {
  display: block;
  font-size: 22px;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: var(--sponsor-brand);
}

.sponsor-page .audience-grid span {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--sponsor-muted);
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

.section-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: none;
}

.section-actions .contact-button,
.section-actions .ghost-button {
  margin-top: 0;
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

.callout-card.tip,
.callout-card.promotion {
  border-color: color-mix(in srgb, var(--sponsor-brand) 28%, var(--sponsor-line));
  background: var(--sponsor-brand-soft);
}

.check-list {
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

.check-list li+li {
  margin-top: 8px;
}

.check-list svg {
  margin-top: 0.24em;
  color: var(--sponsor-brand);
}

.contact-button,
.ghost-button {
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
  font-size: 14px;
  cursor: pointer;
}

.contact-button {
  text-decoration: none !important;
  color: #fff !important;
  background: var(--sponsor-brand);
  border: 1px solid var(--sponsor-brand);
}

.ghost-button {
  color: var(--sponsor-brand);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--sponsor-brand) 35%, var(--sponsor-line));
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

.booth-card.is-recommended {
  border-color: color-mix(in srgb, var(--sponsor-brand) 42%, var(--sponsor-line));
  background: linear-gradient(180deg, var(--sponsor-brand-soft), transparent 70%), var(--sponsor-soft);
}

.booth-card.is-full,
.booth-card.is-full.is-recommended {
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

.booth-cta,
.tier-full {
  margin-top: 14px;
  width: 100%;
}

.tier-full {
  margin-bottom: 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--sponsor-muted);
}

.placement-section {
  margin-top: 28px;
}

.placement-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.placement-card {
  padding: 14px;
  border: 1px solid var(--sponsor-line);
  border-radius: 14px;
  background: var(--sponsor-soft);
}

.placement-card h3 {
  margin: 12px 0 0;
  font-size: 15px;
}

.placement-card p {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--sponsor-muted);
}

.placement-preview {
  position: relative;
  height: 88px;
  overflow: hidden;
  border-radius: 10px;
  background: var(--sponsor-card);
  border: 1px solid var(--sponsor-line);
}

.mock-bar,
.mock-ad,
.mock-line {
  position: absolute;
  border-radius: 4px;
  background: color-mix(in srgb, var(--sponsor-muted) 16%, transparent);
}

.mock-ad {
  background: color-mix(in srgb, var(--sponsor-brand) 38%, transparent);
}

.placement-home .mock-bar {
  top: 8px;
  left: 8px;
  right: 8px;
  height: 8px;
}

.placement-home .mock-ad {
  top: 22px;
  left: 8px;
  right: 8px;
  height: 28px;
}

.placement-home .mock-line {
  top: 56px;
  left: 8px;
  width: 70%;
  height: 6px;
}

.placement-home .mock-line.short {
  top: 68px;
  width: 48%;
}

.placement-sidebar .mock-bar {
  top: 8px;
  left: 8px;
  width: 28%;
  bottom: 8px;
}

.placement-sidebar .mock-ad {
  top: 14px;
  left: 12px;
  width: 22%;
  height: 22px;
}

.placement-sidebar .mock-line {
  top: 14px;
  left: 42%;
  right: 10px;
  height: 6px;
}

.placement-sidebar .mock-line.short {
  top: 28px;
  width: 38%;
  left: 42%;
}

.placement-readme .mock-bar {
  top: 8px;
  left: 8px;
  width: 36%;
  height: 10px;
}

.placement-readme .mock-ad {
  top: 26px;
  left: 8px;
  right: 8px;
  height: 24px;
}

.placement-readme .mock-line {
  top: 58px;
  left: 8px;
  width: 80%;
  height: 6px;
}

.placement-cli {
  background: #111827;
}

.placement-cli .mock-bar {
  top: 14px;
  left: 12px;
  width: 42%;
  height: 6px;
  background: color-mix(in srgb, #34d399 55%, transparent);
}

.placement-cli .mock-ad {
  top: 32px;
  left: 12px;
  right: 12px;
  height: 18px;
}

.placement-cli .mock-line {
  top: 58px;
  left: 12px;
  width: 58%;
  height: 6px;
  background: color-mix(in srgb, #9ca3af 45%, transparent);
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

.faq-list h2 {
  margin: 8px 0 0;
  font-size: 18px;
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
  .audience-grid,
  .payment-grid,
  .booth-grid,
  .placement-grid {
    grid-template-columns: 1fr 1fr;
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

  .audience-grid,
  .payment-grid,
  .booth-grid,
  .placement-grid {
    grid-template-columns: 1fr;
  }

  .sponsor-tabs,
  .tab-button,
  .contact-button,
  .ghost-button {
    width: 100%;
  }

  .tab-panel {
    padding: 18px;
  }
}
</style>
