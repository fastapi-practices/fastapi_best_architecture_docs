import { defineClientConfig } from 'vuepress/client'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import Layout from './layouts/Layout.vue'

import './styles/custom.css'
import Swiper from "./components/Swiper.vue";
import SponsorPanel from "./components/SponsorPanel.vue";
import SponsorHome from './components/SponsorHome.vue';
import SponsorSidebar from './components/SponsorSidebar.vue';
import BannerTop from './components/BannerTop.vue';
import { NotFound } from 'vuepress-theme-plume/client';
import { h } from 'vue';
import Pricing from "./components/Pricing.vue";
import PluginMarket from "./components/PluginMarket.vue";

export default defineClientConfig({
    enhance({ app }) {
        app.component('RepoCard', RepoCard)
        app.component('Swiper', Swiper)
        app.component('SponsorPanel', SponsorPanel)
        app.component('SponsorHome', SponsorHome)
        app.component('SponsorSidebar', SponsorSidebar)
        app.component('BannerTop', BannerTop)
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
