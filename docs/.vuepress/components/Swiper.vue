<script lang="ts" setup>
import type { AutoplayOptions, Swiper as SwiperType, SwiperModule } from "swiper/types";
import { useMutationObserver } from "@vueuse/core";
import {
  Autoplay,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  Mousewheel,
  Navigation,
  Pagination
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, onMounted } from "vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-flip";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
import { defaultSponsor, shouldShowSponsor } from "../data/sponsors";

interface SlideItem {
  /**
   * 图片地址
   */
  link?: string;
  /**
   * 跳转链接
   */
  href?: string;
  alt?: string;
}

interface Props {
  items?: SlideItem[];
  width?: number | string; // 轮播区域宽度，单位 px
  height?: number | string; // 轮播区域高度，单位 px
  mode?: "banner" | "carousel" | "broadcast"; // banner: 轮播图模式; carousel: 走马灯模式; broadcast: 信息展播模式
  navigation?: boolean; // 是否显示导航
  effect?: "slide" | "fade" | "cube" | "flip" | "coverflow" | "cards" | "creative"; // 切换动画效果
  delay?: number; // 自动切换的时间间隔，仅当 mode: 'banner' 时生效，单位 ms
  speed?: number; // 切换过渡的动画持续时间，单位 ms
  loop?: boolean; // 是否循环切换
  pauseOnMouseEnter?: boolean; // 当鼠标移入走马灯时，是否暂停自动轮播，仅当 mode: 'banner' 或 mode: 'carousel' 时生效
  swipe?: boolean; // 是否可以鼠标拖动
}

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "100%",
  mode: "banner",
  navigation: true,
  effect: "slide",
  delay: 3000,
  speed: 300,
  loop: true,
  pauseOnMouseEnter: false,
  swipe: true
});

const sponsors = computed(() => {
  return props.items.map(brand => {
    return shouldShowSponsor(brand) ? brand : defaultSponsor;
  });
});

const slideList = computed<SlideItem[]>(() => {
  return (
      sponsors.value?.map((link) => {
        if (typeof link === "string") return { link };
        return link;
      }) ?? []
  );
});

function parseSize(size: number | string) {
  if (typeof size === "number") {
    return `${ size }px`;
  }
  return size;
}

const styles = computed(() => ({
  width: parseSize(props.width),
  height: parseSize(props.height)
}));

const modules = computed<SwiperModule[]>(() => {
  if (props.mode === "carousel") return [Autoplay];

  if (props.mode === "broadcast") return [Navigation, Pagination, Mousewheel];

  const modules: SwiperModule[] = [Navigation, Pagination, Autoplay];
  const effectMoudles = {
    fade: EffectFade,
    cube: EffectCube,
    flip: EffectFlip,
    coverflow: EffectCoverflow,
    cards: EffectCards,
    creative: EffectCreative
  };
  if (props.effect !== "slide") {
    modules.push(effectMoudles[props.effect]);
  }
  return modules;
});

const autoplay = computed<AutoplayOptions | boolean>(() => {
  if (props.mode === "banner") {
    return {
      delay: props.delay,
      disableOnInteraction: false, // 用户操作 swiper 之后，是否禁止 autoplay。默认为 true：停止。
      pauseOnMouseEnter: props.pauseOnMouseEnter // 鼠标置于 swiper 时暂停自动切换，鼠标离开时恢复自动切换，默认 false
    };
  } else if (props.mode === "carousel") {
    return {
      delay: 0,
      disableOnInteraction: false
    };
  }
  return false;
});

const hasNavigation = computed(() =>
    props.mode === "banner" || props.mode === "broadcast" ? props.navigation : false
);

let swiper: SwiperType;

function onSwiper(_swiper: SwiperType) {
  swiper = _swiper;
  if (props.mode === "carousel" && props.pauseOnMouseEnter) {
    swiper.el.onmouseenter = () => swiper!.autoplay.stop();
    swiper.el.onmouseleave = () => swiper!.autoplay.start();
  }
}

onMounted(() => {
  if (props.mode === "carousel" && !props.pauseOnMouseEnter) {
    useMutationObserver(
        () => document.documentElement,
        () => {
          if (!swiper) return;
          swiper.wrapperEl.style.transform = "translate3d(0px, 0px, 0px)";
          setTimeout(() => swiper.update(), 350);
        },
        { attributeFilter: ["data-theme"] }
    );
  }
});
</script>

<template>
  <ClientOnly>
    <Swiper
        :autoplay="autoplay"
        :class="{ 'swiper-no-swiping': mode === 'banner' ? !swipe : mode === 'carousel' }"
        :effect="mode === 'banner' ? effect : 'slide'"
        :loop="loop"
        :modules="modules"
        :navigation="hasNavigation"
        :pagination="
        props.mode !== 'carousel'
          ? {
              dynamicBullets: true,
              clickable: true
            }
          : false
      "
        :speed="speed"
        :style="styles"
        class="vp-swiper"
        lazy
        v-bind="$attrs"
        @swiper="onSwiper"
    >
      <SwiperSlide v-for="(item, index) in slideList" :key="'general-' + index">
        <a
            v-if="item.href && item.link"
            :href="item.href"
            class="swiper-slide-link no-icon"
            rel="noopener noreferrer"
            target="_blank"
        >
          <img :alt="item.alt" :src="item.link" class="swiper-slide-custom-container swiper-slide-img" />
        </a>
        <div v-else-if="item.alt" class="swiper-slide-custom-container">
          <a
              v-if="item.href"
              :href="item.href"
              class="swiper-slide-text-link"
              rel="noopener noreferrer"
              target="_blank"
          >
            <div class="swiper-slide-text">{{ item.alt }}</div>
          </a>
          <div v-else class="swiper-slide-text">{{ item.alt }}</div>
        </div>
      </SwiperSlide>
    </Swiper>
  </ClientOnly>
</template>

<style>
.vp-swiper {
  margin: 24px 0;
}

.swiper-slide-link {
  display: block;
  height: 100%;
}

.swiper-slide-img {
  width: 100%;
  height: 100%;
  cursor: default !important;
  object-fit: cover;
}

.swiper-slide-link .swiper-slide-img {
  cursor: pointer !important;
}

.swiper-slide-custom-container {
  width: 100%;
  height: 100%;
  border: 1px solid var(--vp-c-text-3);
  border-radius: 6px;
}

.swiper-slide-text {
  color: #888;
  font-size: 18px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.swiper-slide-text-link {
  display: block;
  height: 100%;
  text-decoration: none;
}

.swiper {
  --swiper-theme-color: var(--vp-c-bg);
  --swiper-pagination-bullet-inactive-color: var(--vp-c-bg);
  --swiper-pagination-bullet-inactive-opacity: 0.4;
}

.swiper-wrapper {
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
}
</style>
