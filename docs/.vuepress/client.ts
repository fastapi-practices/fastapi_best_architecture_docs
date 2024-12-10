import {defineClientConfig} from 'vuepress/client'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'

import './styles/custom.css'
import Swiper from "./components/Swiper.vue";

export default defineClientConfig({
    enhance({app}) {
        app.component('RepoCard', RepoCard)
        app.component('Swiper', Swiper)
    },
})
