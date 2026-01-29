<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
// @ts-ignore
import { useRoute } from 'vue-router'

const route = useRoute()
const isVisible = ref(false)
const isClicked = ref(false)
const currentTextIndex = ref(0)
const displayedText = ref('')
const isTyping = ref(true)
let typingTimer = null

// ✨ 自定义机器人说的话（点击循环切换）✨
const bubbleTexts = [
  "fba skills 已发布，AI 赋能，效率倍增 ⚡",
  "Hello！我是 fba 小助手，嘻嘻 😺",
  "fba + AI = 无限可能 💪",
  "有问题？查看文档或加入社区吧 💬",
  "感谢使用 FastAPI Best Architecture ❤️",
]

const currentFullText = computed(() => bubbleTexts[currentTextIndex.value])

// 打字机效果
function typeText(text, index = 0) {
  if (typingTimer) clearTimeout(typingTimer)

  if (index <= text.length) {
    displayedText.value = text.slice(0, index)
    isTyping.value = true
    typingTimer = setTimeout(() => {
      typeText(text, index + 1)
    }, 120) // 打字速度
  } else {
    isTyping.value = false
  }
}

// 点击互动
function handleClick() {
  isClicked.value = true

  // 切换到下一条消息
  currentTextIndex.value = (currentTextIndex.value + 1) % bubbleTexts.length
  displayedText.value = ''
  isTyping.value = true

  // 开始打字
  setTimeout(() => {
    typeText(currentFullText.value)
  }, 100)

  // 重置动画
  setTimeout(() => {
    isClicked.value = false
  }, 800)
}

function checkHome() {
  nextTick(() => {
    setTimeout(() => {
      const isHome = document.querySelector('.vp-home-hero')
      isVisible.value = !!isHome
      if (isHome) {
        // 首次加载时开始打字
        setTimeout(() => {
          typeText(currentFullText.value)
        }, 1000)
      }
    }, 300)
  })
}

onMounted(checkHome)
watch(() => route.path, () => {
  if (typingTimer) clearTimeout(typingTimer)
  displayedText.value = ''
  isTyping.value = true
  currentTextIndex.value = 0
  checkHome()
})
</script>

<template>
  <div v-if="isVisible" class="ai-float-bot" :class="{ 'is-clicked': isClicked }" @click="handleClick">
    <div class="ai-bubble-wrapper">
      <div class="ai-bubble">
        <span class="ai-bubble-text">{{ displayedText }}</span>
        <span class="ai-cursor" :class="{ 'is-typing': isTyping }"></span>
      </div>
      <div class="ai-bubble-tail"></div>
    </div>
    <div class="ai-robot">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="100" viewBox="0 0 80 100">
        <defs>
          <linearGradient id="body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#a78bfa" />
            <stop offset="100%" stop-color="#7c3aed" />
          </linearGradient>
          <linearGradient id="face-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#c4b5fd" />
            <stop offset="100%" stop-color="#a78bfa" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3" />
          </filter>
        </defs>

        <g class="robot-body" filter="url(#shadow)">
          <!-- 天线 -->
          <g class="antenna">
            <line x1="40" y1="12" x2="40" y2="2" stroke="#a78bfa" stroke-width="3" stroke-linecap="round" />
            <circle cx="40" cy="2" r="4" fill="#f472b6" filter="url(#glow)">
              <animate attributeName="fill" values="#f472b6;#fbbf24;#34d399;#f472b6" dur="2s"
                       repeatCount="indefinite" />
            </circle>
          </g>

          <!-- 耳朵/装饰 -->
          <rect x="8" y="28" width="8" height="16" rx="3" fill="#8b5cf6">
            <animate attributeName="height" values="16;14;16" dur="1s" repeatCount="indefinite" />
          </rect>
          <rect x="64" y="28" width="8" height="16" rx="3" fill="#8b5cf6">
            <animate attributeName="height" values="16;14;16" dur="1s" begin="0.5s" repeatCount="indefinite" />
          </rect>

          <!-- 头部 -->
          <rect x="14" y="12" width="52" height="48" rx="12" fill="url(#body-grad)" />

          <!-- 面部区域 -->
          <rect x="20" y="20" width="40" height="32" rx="8" fill="url(#face-grad)" />

          <!-- 左眼 -->
          <g class="left-eye">
            <ellipse cx="32" cy="34" rx="7" ry="8" fill="#fff" />
            <circle cx="32" cy="34" r="4" fill="#1e1b4b">
              <animate attributeName="cx" values="32;34;32;30;32" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="34" cy="32" r="1.5" fill="#fff" />
            <!-- 笑眼遮罩 -->
            <ellipse class="eye-lid" cx="32" cy="34" rx="7" ry="8" fill="url(#face-grad)" />
            <!-- 笑眼 ◡ -->
            <path class="happy-eye" d="M26 32 Q32 40 38 32" stroke="#1e1b4b" stroke-width="2.5" fill="none"
                  stroke-linecap="round" />
          </g>

          <!-- 右眼 -->
          <g class="right-eye">
            <ellipse cx="48" cy="34" rx="7" ry="8" fill="#fff" />
            <circle cx="48" cy="34" r="4" fill="#1e1b4b">
              <animate attributeName="cx" values="48;50;48;46;48" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="32" r="1.5" fill="#fff" />
            <!-- 笑眼遮罩 -->
            <ellipse class="eye-lid" cx="48" cy="34" rx="7" ry="8" fill="url(#face-grad)" />
            <!-- 笑眼 ◡ -->
            <path class="happy-eye" d="M42 32 Q48 40 54 32" stroke="#1e1b4b" stroke-width="2.5" fill="none"
                  stroke-linecap="round" />
          </g>

          <!-- 腮红 -->
          <ellipse class="blush blush-left" cx="22" cy="42" rx="5" ry="3" fill="#fda4af" opacity="0.6" />
          <ellipse class="blush blush-right" cx="58" cy="42" rx="5" ry="3" fill="#fda4af" opacity="0.6" />

          <!-- 嘴巴 -->
          <path d="M32 46 Q40 54 48 46" stroke="#7c3aed" stroke-width="3" fill="none" stroke-linecap="round">
            <animate attributeName="d" values="M32 46 Q40 54 48 46;M32 48 Q40 52 48 48;M32 46 Q40 54 48 46" dur="2s"
                     repeatCount="indefinite" />
          </path>

          <!-- 身体 -->
          <rect x="24" y="60" width="32" height="24" rx="8" fill="url(#body-grad)" />

          <!-- 肚子上的按钮/灯 -->
          <circle cx="40" cy="72" r="5" fill="#34d399">
            <animate attributeName="fill" values="#34d399;#fbbf24;#34d399" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite" />
          </circle>

          <!-- 左手 -->
          <g class="left-arm">
            <ellipse cx="18" cy="70" rx="6" ry="8" fill="#a78bfa">
              <animateTransform attributeName="transform" type="rotate"
                                values="0 18 62;15 18 62;0 18 62;-5 18 62;0 18 62" dur="1.5s"
                                repeatCount="indefinite" />
            </ellipse>
          </g>

          <!-- 右手 - 挥手 -->
          <g class="right-arm">
            <ellipse cx="62" cy="70" rx="6" ry="8" fill="#a78bfa">
              <animateTransform attributeName="transform" type="rotate"
                                values="0 62 62;-30 62 62;0 62 62;-30 62 62;0 62 62" dur="0.8s"
                                repeatCount="indefinite" />
            </ellipse>
          </g>

          <!-- 脚 -->
          <ellipse cx="32" cy="88" rx="8" ry="5" fill="#8b5cf6" />
          <ellipse cx="48" cy="88" rx="8" ry="5" fill="#8b5cf6" />
        </g>

        <!-- 漂浮的小星星 -->
        <g class="sparkles">
          <g>
            <text x="5" y="20" font-size="10" fill="#fbbf24">✦</text>
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0,0;2,-5;0,0" dur="2s"
                              repeatCount="indefinite" />
          </g>
          <g>
            <text x="70" y="15" font-size="8" fill="#f472b6">✦</text>
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0,0;-2,-4;0,0" dur="2.5s" begin="0.5s"
                              repeatCount="indefinite" />
          </g>
          <g>
            <text x="12" y="55" font-size="6" fill="#34d399">♥</text>
            <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0,0;-3,-8;0,0" dur="3s" begin="1s"
                              repeatCount="indefinite" />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.ai-float-bot {
  position: fixed;
  bottom: 60px;
  right: 80px;
  z-index: 100;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 10px 20px rgba(124, 58, 237, 0.3));
}

.ai-float-bot .ai-robot {
  animation: float-bounce 4.5s ease-in-out infinite;
  transition: transform 0.3s ease;
}

.ai-float-bot:hover .ai-robot {
  transform: scale(1.1);
}

/* 眼睛遮罩默认隐藏 */
.eye-lid {
  transform-origin: center;
  transform: scaleY(0);
}

/* 笑眼弧线默认隐藏 */
.happy-eye {
  opacity: 0;
}

/* 点击时显示笑眼 */
.ai-float-bot.is-clicked .eye-lid {
  animation: smile-lid 0.8s ease forwards;
}

.ai-float-bot.is-clicked .happy-eye {
  animation: smile-eye 0.8s ease forwards;
}

/* 点击时腮红变红变大 */
.ai-float-bot.is-clicked .blush {
  animation: blush-glow 0.8s ease forwards;
}

/* 遮罩动画 - 盖住原来的眼睛 */
@keyframes smile-lid {
  0% {
    transform: scaleY(0);
  }
  15%, 85% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0);
  }
}

/* 笑眼弧线淡入淡出 */
@keyframes smile-eye {
  0% {
    opacity: 0;
  }
  15%, 85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* 腮红默认状态 */
.blush {
  transform-origin: center;
}

/* 腮红变亮动画 */
@keyframes blush-glow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  20%, 70% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.ai-float-bot.is-clicked .right-arm {
  animation: click-wave 0.6s ease;
  transform-origin: 62px 62px;
}

.ai-float-bot.is-clicked .left-arm {
  animation: click-wave-left 0.6s ease;
  transform-origin: 18px 62px;
}

/* 右手挥动动画 */
@keyframes click-wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-40deg);
  }
  40% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(-35deg);
  }
  80% {
    transform: rotate(5deg);
  }
}

/* 左手摆动动画 */
@keyframes click-wave-left {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(15deg);
  }
}

.ai-float-bot svg {
  display: block;
}

/* 气泡容器 */
.ai-bubble-wrapper {
  position: absolute;
  bottom: 130px;
  right: 0;
  animation: bubble-float 2.5s ease-in-out 2.8s infinite;
}

/* 对话气泡 - 话语云风格 */
.ai-bubble {
  background: #fff;
  color: #4c1d95;
  padding: 12px 18px;
  border-radius: 20px 20px 6px 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.25),
  0 0 0 2px rgba(167, 139, 250, 0.3),
  inset 0 -2px 10px rgba(167, 139, 250, 0.1);
  transform-origin: bottom right;
  width: fit-content;
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  animation: bubble-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards,
  bubble-expand 2s ease-out 0.8s forwards;
}

/* 打字机文字效果 */
.ai-bubble-text {
  display: inline-block;
  white-space: nowrap;
  color: #4c1d95;
  font-family: 'Consolas', 'Monaco', monospace;
  letter-spacing: 0.5px;
}

/* 光标效果 */
.ai-cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: linear-gradient(180deg, #7c3aed 0%, #a78bfa 50%, #7c3aed 100%);
  margin-left: 2px;
  vertical-align: text-bottom;
  border-radius: 1px;
  opacity: 0;
  transition: opacity 0.1s;
}

.ai-cursor.is-typing {
  opacity: 1;
  animation: cursor-blink 0.5s ease-in-out infinite,
  cursor-glow 1.5s ease-in-out infinite;
}

/* 光标闪烁动画 */
@keyframes cursor-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* 光标发光效果 */
@keyframes cursor-glow {
  0%, 100% {
    box-shadow: 0 0 2px #7c3aed,
    0 0 4px rgba(124, 58, 237, 0.5);
  }
  50% {
    box-shadow: 0 0 4px #a78bfa,
    0 0 8px rgba(167, 139, 250, 0.7),
    0 0 12px rgba(124, 58, 237, 0.4);
  }
}

/* 气泡尾巴 - 云朵风格 */
.ai-bubble-tail {
  position: absolute;
  bottom: -6px;
  right: 12px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(124, 58, 237, 0.2);
  animation: bubble-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.ai-bubble-tail::before {
  content: '';
  position: absolute;
  bottom: -8px;
  right: 2px;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(124, 58, 237, 0.15);
}

/* 气泡展开动画 */
@keyframes bubble-expand {
  0% {
    max-width: 0;
    padding: 12px 0;
  }
  100% {
    max-width: 400px;
    padding: 12px 18px;
  }
}

/* 气泡弹出动画 */
@keyframes bubble-pop {
  0% {
    opacity: 0;
    transform: scale(0) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 气泡轻微浮动 */
@keyframes bubble-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* 机器人浮动弹跳动画 */
@keyframes float-bounce {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  25% {
    transform: translateY(-12px) rotate(2deg);
  }
  50% {
    transform: translateY(-5px) rotate(-1deg);
  }
  75% {
    transform: translateY(-15px) rotate(1deg);
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .ai-float-bot {
    bottom: 80px;
    right: 15px;
    transform: scale(0.8);
  }

  .ai-bubble {
    font-size: 11px;
    padding: 8px 12px;
  }
}

@media (max-width: 480px) {
  .ai-float-bot {
    display: none;
  }
}
</style>
