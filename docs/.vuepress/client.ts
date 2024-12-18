import {defineClientConfig} from 'vuepress/client'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import Layout from './layouts/Layout.vue'

import './styles/custom.css'
import Swiper from "./components/Swiper.vue";
import SponsorPanel from "./components/SponsorPanel.vue";

export default defineClientConfig({
    enhance({app}) {
        app.component('RepoCard', RepoCard)
        app.component('Swiper', Swiper)
        app.component('SponsorPanel', SponsorPanel)
    },
    layouts: {
        Layout,
    }
})
