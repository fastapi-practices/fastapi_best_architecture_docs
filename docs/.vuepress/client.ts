// @ts-ignore
import { defineClientConfig } from 'vuepress/client'
// @ts-ignore
import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
// @ts-ignore
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'

import Layout from './layouts/Layout.vue'
import FeatureBento from './components/FeatureBento.vue';
import GitEmoji from "./components/GitEmoji.vue";
import HomeSponsor from './components/HomeSponsor.vue';
import PluginMarketplace from "./components/PluginMarketplace.vue";
import Pricing from "./components/Pricing.vue";
import ProjectStats from './components/ProjectStats.vue';
import SponsorHome from './components/SponsorHome.vue';
import SponsorPage from './components/SponsorPage.vue';
import SponsorSwiper from './components/SponsorSwiper.vue';
import Testimonials from './components/Testimonials.vue';
import AiNeuralBadge from './components/AiNeuralBadge.vue';
import './styles/custom.css'

export default defineClientConfig({
    enhance({ app }) {
        app.component('RepoCard', RepoCard)
        app.component('FeatureBento', FeatureBento)
        app.component('GitEmoji', GitEmoji)
        app.component('HomeSponsor', HomeSponsor)
        app.component('PluginMarketplace', PluginMarketplace)
        app.component('Pricing', Pricing)
        app.component('ProjectStats', ProjectStats)
        app.component('SponsorHome', SponsorHome)
        app.component('SponsorPage', SponsorPage)
        app.component('SponsorSwiper', SponsorSwiper)
        app.component('Swiper', Swiper)
        app.component('Testimonials', Testimonials)
    },
    layouts: {
        Layout,
        //NotFound: () => h(NotFound, null, {
        //    'layout-top': () => h(BannerTop),
        //}),
    },
    rootComponents: [AiNeuralBadge],
})
