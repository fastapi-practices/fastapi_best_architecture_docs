<script setup>
import { Layout } from 'vuepress-theme-plume/client'
import SponsorPanel from "../components/SponsorPanel.vue";
</script>

<template>
    <Layout>
        <template #aside-outline-after>
            <div class="custom-content">
                <SponsorPanel />
            </div>
        </template>
    </Layout>
</template>

<style>
.custom-content {
    width: 100%;
}
</style>
