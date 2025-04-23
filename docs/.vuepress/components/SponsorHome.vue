<script setup lang="ts">
import { homeSponsor } from "../data/sponsors";
</script>

<template>
  <section v-if="homeSponsor.href && homeSponsor.link" id="special-spsr">
    <span>特别赞助商</span>
    <a :href="homeSponsor.href" target="_blank">
      <img width="121" :src="homeSponsor.link" :alt="homeSponsor.alt" />
    </a>
    <span>{{ homeSponsor.text || homeSponsor.alt }}</span>
  </section>
  <section v-else id="special-spsr">
    <span class="no-sponsor">
      <a href="/fastapi_best_architecture_docs/sponsors">特别赞助位目前空缺 - 现在咨询 💬</a>
    </span>
  </section>
</template>

<style scoped>
.no-sponsor {
  animation: no-sponsor 2s ease-in-out infinite;
  display: flex;
  justify-content: center;
  padding: 0 24px;
  color: var(--vp-c-brand-1) !important;
}

@keyframes no-sponsor {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

#special-spsr {
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 12px;
  display: flex;
  align-items: center;
}

#special-spsr span {
  color: var(--vp-c-text-2);
  font-size: 13px;
  vertical-align: middle;
  flex: 1;
}

#special-spsr span:first-child {
  text-align: right;
}

#special-spsr a {
  padding: 0 24px;
}

#special-spsr img {
  height: 52px;
  margin: -6px 0;
}

.dark #special-spsr img {
  filter: grayscale(1) invert(1);
}

@media (max-width: 579px) {
  #special-spsr {
    flex-direction: column;
  }

  #special-spsr img {
    height: 52px;
    margin: 8px 0;
  }

  #special-spsr span {
    text-align: center !important;
  }
}
</style>
