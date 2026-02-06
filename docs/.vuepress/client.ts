// @ts-ignore
import { defineClientConfig } from 'vuepress/client'
import { h } from 'vue';
// @ts-ignore
import { NotFound } from "vuepress-theme-plume/client";
// @ts-ignore
import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
// @ts-ignore
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'

import Layout from './layouts/Layout.vue'
import BannerTop from './components/BannerTop.vue';
import GitEmoji from "./components/GitEmoji.vue";
import PluginMarketplace from "./components/PluginMarketplace.vue";
import Pricing from "./components/Pricing.vue";
import SponsorHome from './components/SponsorHome.vue';
import AiNeuralBadge from './components/AiNeuralBadge.vue';
import './styles/custom.css'

export default defineClientConfig({
    enhance({ app }) {
        app.component('RepoCard', RepoCard)
        app.component('GitEmoji', GitEmoji)
        app.component('PluginMarketplace', PluginMarketplace)
        app.component('Pricing', Pricing)
        app.component('SponsorHome', SponsorHome)
        app.component('Swiper', Swiper)
    },
    layouts: {
        Layout,
        NotFound: () => h(NotFound, null, {
            'layout-top': () => h(BannerTop),
        }),
    },
    rootComponents: [AiNeuralBadge],
})
