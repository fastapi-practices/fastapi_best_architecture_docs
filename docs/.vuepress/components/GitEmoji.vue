<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useI18n } from '../composables/useI18n'

const git_emojis = [
  { emoji: '🎨', code: ':art:', name: 'art' },
  { emoji: '⚡️', code: ':zap:', name: 'zap' },
  { emoji: '🔥', code: ':fire:', name: 'fire' },
  { emoji: '🐛', code: ':bug:', name: 'bug' },
  { emoji: '🚑️', code: ':ambulance:', name: 'ambulance' },
  { emoji: '✨', code: ':sparkles:', name: 'sparkles' },
  { emoji: '📝', code: ':memo:', name: 'memo' },
  { emoji: '🚀', code: ':rocket:', name: 'rocket' },
  { emoji: '💄', code: ':lipstick:', name: 'lipstick' },
  { emoji: '🎉', code: ':tada:', name: 'tada' },
  { emoji: '✅', code: ':white_check_mark:', name: 'white_check_mark' },
  { emoji: '🔒️', code: ':lock:', name: 'lock' },
  { emoji: '🔐', code: ':closed_lock_with_key:', name: 'closed_lock_with_key' },
  { emoji: '🔖', code: ':bookmark:', name: 'bookmark' },
  { emoji: '🚨', code: ':rotating_light:', name: 'rotating_light' },
  { emoji: '🚧', code: ':construction:', name: 'construction' },
  { emoji: '💚', code: ':green_heart:', name: 'green_heart' },
  { emoji: '⬇️', code: ':arrow_down:', name: 'arrow_down' },
  { emoji: '⬆️', code: ':arrow_up:', name: 'arrow_up' },
  { emoji: '📌', code: ':pushpin:', name: 'pushpin' },
  { emoji: '👷', code: ':construction_worker:', name: 'construction_worker' },
  { emoji: '📈', code: ':chart_with_upwards_trend:', name: 'chart_with_upwards_trend' },
  { emoji: '♻️', code: ':recycle:', name: 'recycle' },
  { emoji: '➕', code: ':heavy_plus_sign:', name: 'heavy_plus_sign' },
  { emoji: '➖', code: ':heavy_minus_sign:', name: 'heavy_minus_sign' },
  { emoji: '🔧', code: ':wrench:', name: 'wrench' },
  { emoji: '🔨', code: ':hammer:', name: 'hammer' },
  { emoji: '🌐', code: ':globe_with_meridians:', name: 'globe_with_meridians' },
  { emoji: '✏️', code: ':pencil2:', name: 'pencil2' },
  { emoji: '💩', code: ':poop:', name: 'poop' },
  { emoji: '⏪️', code: ':rewind:', name: 'rewind' },
  { emoji: '🔀', code: ':twisted_rightwards_arrows:', name: 'twisted_rightwards_arrows' },
  { emoji: '📦️', code: ':package:', name: 'package' },
  { emoji: '👽️', code: ':alien:', name: 'alien' },
  { emoji: '🚚', code: ':truck:', name: 'truck' },
  { emoji: '📄', code: ':page_facing_up:', name: 'page_facing_up' },
  { emoji: '💥', code: ':boom:', name: 'boom' },
  { emoji: '🍱', code: ':bento:', name: 'bento' },
  { emoji: '♿️', code: ':wheelchair:', name: 'wheelchair' },
  { emoji: '💡', code: ':bulb:', name: 'bulb' },
  { emoji: '🍻', code: ':beers:', name: 'beers' },
  { emoji: '💬', code: ':speech_balloon:', name: 'speech_balloon' },
  { emoji: '🗃️', code: ':card_file_box:', name: 'card_file_box' },
  { emoji: '🔊', code: ':loud_sound:', name: 'loud_sound' },
  { emoji: '🔇', code: ':mute:', name: 'mute' },
  { emoji: '👥', code: ':busts_in_silhouette:', name: 'busts_in_silhouette' },
  { emoji: '🚸', code: ':children_crossing:', name: 'children_crossing' },
  { emoji: '🏗️', code: ':building_construction:', name: 'building_construction' },
  { emoji: '📱', code: ':iphone:', name: 'iphone' },
  { emoji: '🤡', code: ':clown_face:', name: 'clown_face' },
  { emoji: '🥚', code: ':egg:', name: 'egg' },
  { emoji: '🙈', code: ':see_no_evil:', name: 'see_no_evil' },
  { emoji: '📸', code: ':camera_flash:', name: 'camera_flash' },
  { emoji: '⚗️', code: ':alembic:', name: 'alembic' },
  { emoji: '🔍️', code: ':mag:', name: 'mag' },
  { emoji: '🏷️', code: ':label:', name: 'label' },
  { emoji: '🌱', code: ':seedling:', name: 'seedling' },
  { emoji: '🚩', code: ':triangular_flag_on_post:', name: 'triangular_flag_on_post' },
  { emoji: '🥅', code: ':goal_net:', name: 'goal_net' },
  { emoji: '💫', code: ':dizzy:', name: 'dizzy' },
  { emoji: '🗑️', code: ':wastebasket:', name: 'wastebasket' },
  { emoji: '🛂', code: ':passport_control:', name: 'passport_control' },
  { emoji: '🩹', code: ':adhesive_bandage:', name: 'adhesive_bandage' },
  { emoji: '🧐', code: ':monocle_face:', name: 'monocle_face' },
  { emoji: '⚰️', code: ':coffin:', name: 'coffin' },
  { emoji: '🧪', code: ':test_tube:', name: 'test_tube' },
  { emoji: '👔', code: ':necktie:', name: 'necktie' },
  { emoji: '🩺', code: ':stethoscope:', name: 'stethoscope' },
  { emoji: '🧑‍💻', code: ':technologist:', name: 'technologist' },
  { emoji: '💸', code: ':money_with_wings:', name: 'money_with_wings' },
  { emoji: '🧵', code: ':thread:', name: 'thread' },
  { emoji: '🦺', code: ':safety_vest:', name: 'safety_vest' },
  { emoji: '✈️', code: ':airplane:', name: 'airplane' },
  { emoji: '🦖', code: ':t-rex:', name: 't-rex' },
]

const { t, tm } = useI18n()
const descriptions = computed(() => tm<Record<string, string>>('gitEmoji.descriptions') || {})

const list = computed(() => git_emojis.map(item => ({
  name: item.name,
  desc: descriptions.value[item.name] || item.name,
  code: item.code,
  emoji: item.emoji,
})))

const { copy, copied } = useClipboard({ legacy: true })
</script>

<template>
  <div class="gitmoji-wrapper">
    <div v-for="item in list" :key="item.code" class="gitmoji-item">
      <div class="emoji">
        <span>{{ item.emoji }}</span>
      </div>
      <div class="info">
        <p>{{ item.code }}</p>
        <p>{{ item.desc }}</p>
      </div>
      <button type="button" class="gitmoji-copy" :class="{ copied }"
        :aria-label="copied ? t('common.copied') : t('common.copy')"
        :title="copied ? t('common.copied') : t('common.copy')" @click="copy(item.code)">
        <span class="vpi-gitmoji-copy" />
        <span class="visually-hidden">{{ t('common.copy') }}</span>
      </button>
    </div>
  </div>
</template>

<style>
.gitmoji-item {
  position: relative;
  flex: 1 2;
  display: flex;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 0 0 transparent;
  transition: box-shadow var(--vp-t-color);
  margin-bottom: 16px;
  overflow: hidden;
}

.gitmoji-item:hover {
  box-shadow: var(--vp-shadow-2);
}

@media (min-width: 768px) {
  .gitmoji-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .gitmoji-item {
    margin-bottom: 0;
  }
}

.gitmoji-item .emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  width: 64px;
}

.gitmoji-item .info {
  padding: 16px 16px 16px 0;
}

.gitmoji-item .info p {
  margin: 0;
}

.gitmoji-item .info p:first-child {
  font-size: 14px;
}

.gitmoji-item .info p:last-child {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 22px;
}

.gitmoji-item .gitmoji-copy {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  color: var(--vp-c-text-2);
  padding: 8px;
  cursor: pointer;
  line-height: 1;
  opacity: 0;
  border-bottom-left-radius: 8px;
  transition: opacity var(--vp-t-color), color var(--vp-t-color), background-color var(--vp-t-color);
}

.gitmoji-item:hover .gitmoji-copy {
  opacity: 1;
}

.gitmoji-item .gitmoji-copy:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.vpi-gitmoji-copy {
  width: 2em;
  height: 2em;
  --icon: var(--code-copy-icon);
}

.gitmoji-item .gitmoji-copy.copied .vpi-gitmoji-copy {
  --icon: var(--code-copied-icon);
}
</style>