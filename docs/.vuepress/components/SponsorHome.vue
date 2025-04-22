<script setup lang="ts">

import { homeSponsor } from "../data/sponsors";

</script>

<template>
    <section v-if="homeSponsor.href && homeSponsor.link" id="special-spsr">
        <span>特别赞助商</span>
        <a :href="homeSponsor.href" target="_blank">
            <img width="168" height="42" :src="homeSponsor.link" :alt="homeSponsor.alt" />
        </a>
        <span>{{ homeSponsor.text }}</span>
    </section>
    <section v-else id="special-spsr">
        <span>
            <a class="no-sponsor" href="/fastapi_best_architecture_docs/sponsors#展位赞助商">
                特别赞助位目前空缺 - 现在咨询
            </a>
        </span>
    </section>
</template>

<style scoped>
.no-sponsor{
    color: var(--vp-c-brand-1)
}

.no-sponsor:hover {
    color: var(--vp-c-brand-2) !important;
}

#special-spsr {
    border-top: 1px solid var(--vp-c-divider);
    border-bottom: 1px solid var(--vp-c-divider);
    padding: 12px 24px;
    display: flex;
    align-items: center;
    margin: 0 -9999px;
    padding: 1 9999px;
}

#special-spsr span {
    color: var(--vp-c-text-2);
    font-weight: 500;
    font-size: 13px;
    vertical-align: middle;
    flex: 1;
}

#special-spsr span:first-child {
    text-align: right;
}

#special-spsr a {
    display: flex;
    justify-content: center;
    padding: 0 24px;
}

#special-spsr img {
    height: 42px;
    margin: -6px 0;
}

.dark #special-spsr img {
    filter: grayscale(1) invert(1);
}

@media (max-width: 576px) {
    #special-spsr {
        flex-direction: column;
    }

    #special-spsr img {
        height: 36px;
        margin: 8px 0;
    }

    #special-spsr span {
        text-align: center !important;
    }
}
</style>
