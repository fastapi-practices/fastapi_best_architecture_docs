import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import { baiduAnalyticsPlugin } from "@vuepress/plugin-baidu-analytics";
import { umamiAnalyticsPlugin } from "@vuepress/plugin-umami-analytics";
import { clarityAnalyticsPlugin } from "@vuepress/plugin-clarity-analytics";
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
            id: '3fac49b26d8f26702c22aad4381c0641'
        }),
        clarityAnalyticsPlugin({
            id: 'uhawbqsmxt'
        })
    ],
    bundler: viteBundler({
        viteOptions: {
            build: {
                cssMinify: 'esbuild',
            },
            plugins: [
                {
                    name: 'filter-vueuse-invalid-annotation',
                    onLog(level, log) {
                        if (
                            log.code === 'INVALID_ANNOTATION'
                            && log.id?.includes('@vueuse/core')
                        ) {
                            return false
                        }
                    },
                },
            ],
        },
    }),
    shouldPrefetch: false,
})
