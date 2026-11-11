<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useI18n } from '../composables/useI18n'
import { FBA_SKILL_INSTALL_PROMPT } from '../data/skillInstall'

const props = withDefaults(
  defineProps<{
    /** 展示的技能名称 */
    label?: string
  }>(),
  {
    label: 'fba skills',
  },
)

const { t } = useI18n()
const { copy, copied } = useClipboard({ legacy: true })

const prompt = computed(() => FBA_SKILL_INSTALL_PROMPT)

const copyPrompt = async () => {
  await copy(prompt.value)
}
</script>

<template>
  <button
    class="fba-skill-install"
    :class="{ 'is-copied': copied }"
    type="button"
    :title="copied ? t('skillInstall.copied') : t('skillInstall.copyTitle')"
    :aria-label="copied ? t('skillInstall.copied') : t('skillInstall.copyTitle')"
    @click.prevent.stop="copyPrompt"
  >
    <span class="fba-skill-install__label">{{ props.label }}</span>

    <svg v-if="!copied" class="fba-skill-install__icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path
        d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />
    </svg>

    <svg v-else class="fba-skill-install__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12.5l4.2 4.2L19 7"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <span class="fba-skill-install__sr" role="status">{{ copied ? t('skillInstall.copied') : '' }}</span>
  </button>
</template>

<style scoped>
.fba-skill-install {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.7;
  vertical-align: baseline;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.fba-skill-install:hover {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

.fba-skill-install.is-copied {
  background-color: var(--vp-c-green-soft);
  border-color: var(--vp-c-green-1);
  color: var(--vp-c-green-1);
}

.fba-skill-install__icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  opacity: 0.75;
  transition: opacity 0.2s;
}

.fba-skill-install:hover .fba-skill-install__icon {
  opacity: 1;
}

/* 仅供读屏软件使用的状态文案 */
.fba-skill-install__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
