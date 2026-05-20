<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const git_emojis = [
  { emoji: '🎨', code: ':art:', name: 'art', description: '改进代码结构/格式' },
  { emoji: '⚡️', code: ':zap:', name: 'zap', description: '提升性能' },
  { emoji: '🔥', code: ':fire:', name: 'fire', description: '删除代码或文件' },
  { emoji: '🐛', code: ':bug:', name: 'bug', description: '修复 Bug' },
  { emoji: '🚑️', code: ':ambulance:', name: 'ambulance', description: '关键热修复' },
  { emoji: '✨', code: ':sparkles:', name: 'sparkles', description: '引入新功能' },
  { emoji: '📝', code: ':memo:', name: 'memo', description: '添加或更新文档' },
  { emoji: '🚀', code: ':rocket:', name: 'rocket', description: '部署相关变更' },
  { emoji: '💄', code: ':lipstick:', name: 'lipstick', description: '添加或更新 UI 和样式文件' },
  { emoji: '🎉', code: ':tada:', name: 'tada', description: '项目初始化或首次提交' },
  { emoji: '✅', code: ':white_check_mark:', name: 'white_check_mark', description: '添加、更新或通过测试' },
  { emoji: '🔒️', code: ':lock:', name: 'lock', description: '修复安全或隐私问题' },
  { emoji: '🔐', code: ':closed_lock_with_key:', name: 'closed_lock_with_key', description: '添加或更新密钥' },
  { emoji: '🔖', code: ':bookmark:', name: 'bookmark', description: '发布或版本标签' },
  { emoji: '🚨', code: ':rotating_light:', name: 'rotating_light', description: '修复编译器或 linter 警告' },
  { emoji: '🚧', code: ':construction:', name: 'construction', description: '进行中的工作' },
  { emoji: '💚', code: ':green_heart:', name: 'green_heart', description: '修复 CI 构建' },
  { emoji: '⬇️', code: ':arrow_down:', name: 'arrow_down', description: '降级依赖' },
  { emoji: '⬆️', code: ':arrow_up:', name: 'arrow_up', description: '升级依赖' },
  { emoji: '📌', code: ':pushpin:', name: 'pushpin', description: '将依赖固定到特定版本' },
  { emoji: '👷', code: ':construction_worker:', name: 'construction_worker', description: '添加或更新 CI 构建系统' },
  {
    emoji: '📈',
    code: ':chart_with_upwards_trend:',
    name: 'chart_with_upwards_trend',
    description: '添加或更新分析或跟踪代码'
  },
  { emoji: '♻️', code: ':recycle:', name: 'recycle', description: '重构代码' },
  { emoji: '➕', code: ':heavy_plus_sign:', name: 'heavy_plus_sign', description: '添加依赖' },
  { emoji: '➖', code: ':heavy_minus_sign:', name: 'heavy_minus_sign', description: '移除依赖' },
  { emoji: '🔧', code: ':wrench:', name: 'wrench', description: '添加或更新配置文件' },
  { emoji: '🔨', code: ':hammer:', name: 'hammer', description: '添加或更新开发脚本' },
  { emoji: '🌐', code: ':globe_with_meridians:', name: 'globe_with_meridians', description: '国际化与本地化' },
  { emoji: '✏️', code: ':pencil2:', name: 'pencil2', description: '修复拼写错误' },
  { emoji: '💩', code: ':poop:', name: 'poop', description: '编写需要改进的糟糕代码' },
  { emoji: '⏪️', code: ':rewind:', name: 'rewind', description: '回滚变更' },
  { emoji: '🔀', code: ':twisted_rightwards_arrows:', name: 'twisted_rightwards_arrows', description: '合并分支' },
  { emoji: '📦️', code: ':package:', name: 'package', description: '添加或更新编译文件或包' },
  { emoji: '👽️', code: ':alien:', name: 'alien', description: '因外部 API 变更而更新代码' },
  { emoji: '🚚', code: ':truck:', name: 'truck', description: '移动或重命名资源（如文件、路径、路由）' },
  { emoji: '📄', code: ':page_facing_up:', name: 'page_facing_up', description: '添加或更新许可证' },
  { emoji: '💥', code: ':boom:', name: 'boom', description: '引入破坏性变更' },
  { emoji: '🍱', code: ':bento:', name: 'bento', description: '添加或更新资源文件' },
  { emoji: '♿️', code: ':wheelchair:', name: 'wheelchair', description: '改进可访问性' },
  { emoji: '💡', code: ':bulb:', name: 'bulb', description: '添加或更新源代码注释' },
  { emoji: '🍻', code: ':beers:', name: 'beers', description: '醉酒状态下编写代码' },
  { emoji: '💬', code: ':speech_balloon:', name: 'speech_balloon', description: '添加或更新文本和字符串内容' },
  { emoji: '🗃️', code: ':card_file_box:', name: 'card_file_box', description: '执行数据库相关变更（如迁移、schema）' },
  { emoji: '🔊', code: ':loud_sound:', name: 'loud_sound', description: '添加或更新日志' },
  { emoji: '🔇', code: ':mute:', name: 'mute', description: '移除日志' },
  { emoji: '👥', code: ':busts_in_silhouette:', name: 'busts_in_silhouette', description: '添加或更新贡献者' },
  { emoji: '🚸', code: ':children_crossing:', name: 'children_crossing', description: '改进用户体验或可用性' },
  { emoji: '🏗️', code: ':building_construction:', name: 'building_construction', description: '进行架构变更' },
  { emoji: '📱', code: ':iphone:', name: 'iphone', description: '处理响应式设计' },
  { emoji: '🤡', code: ':clown_face:', name: 'clown_face', description: '模拟或 mock 事物' },
  { emoji: '🥚', code: ':egg:', name: 'egg', description: '添加或更新彩蛋' },
  { emoji: '🙈', code: ':see_no_evil:', name: 'see_no_evil', description: '添加或更新 .gitignore 文件' },
  { emoji: '📸', code: ':camera_flash:', name: 'camera_flash', description: '添加或更新快照测试' },
  { emoji: '⚗️', code: ':alembic:', name: 'alembic', description: '进行实验性功能' },
  { emoji: '🔍️', code: ':mag:', name: 'mag', description: '改进 SEO' },
  { emoji: '🏷️', code: ':label:', name: 'label', description: '添加或更新类型定义' },
  { emoji: '🌱', code: ':seedling:', name: 'seedling', description: '添加或更新种子数据' },
  {
    emoji: '🚩',
    code: ':triangular_flag_on_post:',
    name: 'triangular_flag_on_post',
    description: '添加、更新或移除功能开关'
  },
  { emoji: '🥅', code: ':goal_net:', name: 'goal_net', description: '捕获错误（错误处理）' },
  { emoji: '💫', code: ':dizzy:', name: 'dizzy', description: '添加或更新动画和过渡效果' },
  { emoji: '🗑️', code: ':wastebasket:', name: 'wastebasket', description: '弃用需要后续清理的代码' },
  { emoji: '🛂', code: ':passport_control:', name: 'passport_control', description: '处理授权、角色和权限相关代码' },
  { emoji: '🩹', code: ':adhesive_bandage:', name: 'adhesive_bandage', description: '对非关键问题的简单修复' },
  { emoji: '🧐', code: ':monocle_face:', name: 'monocle_face', description: '数据探索或检查' },
  { emoji: '⚰️', code: ':coffin:', name: 'coffin', description: '移除死代码' },
  { emoji: '🧪', code: ':test_tube:', name: 'test_tube', description: '添加一个故意失败的测试' },
  { emoji: '👔', code: ':necktie:', name: 'necktie', description: '添加或更新业务逻辑' },
  { emoji: '🩺', code: ':stethoscope:', name: 'stethoscope', description: '添加或更新健康检查' },
  { emoji: '🧑‍💻', code: ':technologist:', name: 'technologist', description: '改进开发者体验' },
  { emoji: '💸', code: ':money_with_wings:', name: 'money_with_wings', description: '添加赞助或金钱相关基础设施' },
  { emoji: '🧵', code: ':thread:', name: 'thread', description: '添加或更新多线程或并发相关代码' },
  { emoji: '🦺', code: ':safety_vest:', name: 'safety_vest', description: '添加或更新验证相关代码' },
  { emoji: '✈️', code: ':airplane:', name: 'airplane', description: '改进离线支持' },
  { emoji: '🦖', code: ':t-rex:', name: 't-rex', description: '添加向后兼容代码' },
]

import { computed } from 'vue'

const list = computed(() => git_emojis.map(item => ({
  name: item.name,
  desc: item.description,
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
      <button type="button" class="gitmoji-copy" :class="{ copied }" :aria-label="copied ? '已复制' : '复制'"
        :title="copied ? '已复制' : '复制'" @click="copy(item.code)">
        <span class="vpi-gitmoji-copy" />
        <span class="visually-hidden">复制</span>
      </button>
    </div>
  </div>
</template>

<!-- 样式部分保持不变 -->
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