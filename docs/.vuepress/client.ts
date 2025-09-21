import { defineClientConfig } from 'vuepress/client'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import Layout from './layouts/Layout.vue'
import { h } from 'vue';
import { NotFound } from "vuepress-theme-plume/client";

import './styles/custom.css'
import Swiper from "./components/Swiper.vue";
import SponsorHome from './components/SponsorHome.vue';
import BannerTop from './components/BannerTop.vue';
import Pricing from "./components/Pricing.vue";
import PluginMarket from "./components/PluginMarket.vue";

export default defineClientConfig({
    enhance({ app }) {
        app.component('RepoCard', RepoCard)
        app.component('Swiper', Swiper)
        app.component('SponsorHome', SponsorHome)
        app.component('Pricing', Pricing)
        app.component('PluginMarket', PluginMarket)
    },
    layouts: {
        Layout,
        NotFound: () => h(NotFound, null, {
            'layout-top': () => h(BannerTop),
        }),
    }
})
