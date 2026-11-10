<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useI18n } from '../composables/useI18n'
import {
  FBA_SKILL_INSTALL_PROMPT,
  FBA_SKILL_PAY_URL,
} from '../data/skillInstall'

type Variant = 'card' | 'inline'

const props = withDefaults(
  defineProps<{
    /** 展示形态：卡片用于整段说明，行内用于句子中的技能链接 */
    variant?: Variant
    /** 行内形态展示的技能名称 */
    label?: string
  }>(),
  {
    variant: 'card',
    label: 'fba skills',
  },
)

const { t } = useI18n()
const { copy, copied } = useClipboard({ legacy: true })

const prompt = computed(() => FBA_SKILL_INSTALL_PROMPT)
const payUrl = computed(() => FBA_SKILL_PAY_URL)

const copyPrompt = async () => {
  await copy(prompt.value)
}
</script>

<template>
  <button
    v-if="props.variant === 'inline'"
    class="fba-skill-install fba-skill-install--inline"
    :class="{ 'is-copied': copied }"
    type="button"
    :title="t('skillInstall.copyTitle')"
    :aria-label="t('skillInstall.copyTitle')"
    @click.prevent.stop="copyPrompt"
  >
    <span class="fba-skill-install__label">{{ props.label }}</span>
    <svg class="fba-skill-install__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 9V5.5A1.5 1.5 0 0 1 10.5 4h8A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H15M5.5 9h8A1.5 1.5 0 0 1 15 10.5v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 18.5v-8A1.5 1.5 0 0 1 5.5 9Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span v-if="copied" class="fba-skill-install__state">{{ t('skillInstall.copied') }}</span>
  </button>

  <div v-else class="fba-skill-install fba-skill-install--card">
    <div class="fba-skill-install__head">
      <span class="fba-skill-install__title">{{ t('skillInstall.cardTitle') }}</span>
      <button
        class="fba-skill-install__copy"
        :class="{ 'is-copied': copied }"
        type="button"
        @click="copyPrompt"
      >
        <svg class="fba-skill-install__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 9V5.5A1.5 1.5 0 0 1 10.5 4h8A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H15M5.5 9h8A1.5 1.5 0 0 1 15 10.5v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 18.5v-8A1.5 1.5 0 0 1 5.5 9Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ copied ? t('skillInstall.copied') : t('skillInstall.copy') }}</span>
      </button>
    </div>

    <p class="fba-skill-install__hint">{{ t('skillInstall.hint') }}</p>

    <pre class="fba-skill-install__prompt"><code>{{ prompt }}</code></pre>

    <p class="fba-skill-install__source">
      {{ t('skillInstall.source') }}
      <a :href="payUrl" target="_blank" rel="noopener noreferrer">{{ payUrl }}</a>
    </p>
  </div>
</template>

<style scoped>
.fba-skill-install {
  font-size: 14px;
}

.fba-skill-install__icon {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
}

/* 行内形态：替代原来的技能链接 */
.fba-skill-install--inline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  line-height: 1.6;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.fba-skill-install--inline:hover {
  background-color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.fba-skill-install--inline.is-copied {
  background-color: var(--vp-c-green-soft);
  border-color: var(--vp-c-green-1);
  color: var(--vp-c-green-1);
}

.fba-skill-install__state {
  font-weight: 500;
  font-size: 12px;
  opacity: 0.85;
}
</style>

<style scoped>
/* 卡片形态：展示完整安装说明与一键复制 */
.fba-skill-install--card {
  margin: 16px 0;
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.fba-skill-install__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.fba-skill-install__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.fba-skill-install__copy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.2s;
}

.fba-skill-install__copy:hover {
  opacity: 0.86;
}

.fba-skill-install__copy.is-copied {
  background-color: var(--vp-c-green-1);
  border-color: var(--vp-c-green-1);
}

.fba-skill-install__hint {
  margin: 10px 0 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.fba-skill-install__prompt {
  margin: 0;
  padding: 12px 14px;
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: auto;
}

.fba-skill-install__source {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.fba-skill-install__source a {
  color: var(--vp-c-brand-1);
  word-break: break-all;
}
</style>
