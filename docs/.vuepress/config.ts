import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import { baiduAnalyticsPlugin } from "@vuepress/plugin-baidu-analytics";
import { umamiAnalyticsPlugin } from "@vuepress/plugin-umami-analytics";
import { myTheme } from "./theme";


export default defineUserConfig({
    base: '/fastapi_best_architecture_docs/',
    lang: 'zh-CN',
    title: 'FastAPI Best Architecture',
    head: [
        ['link', { rel: 'icon', href: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.svg' }],
    ],
    theme: myTheme,
    plugins: [
        baiduAnalyticsPlugin({
            id: '6202e3701ae5a932577a1cf195084e9e'
        }),
        umamiAnalyticsPlugin({
            id: '62984e7c-ec95-459a-9a2f-553766c6b3d4'
        })
    ],
    bundler: viteBundler(),
    shouldPrefetch: false,
})
