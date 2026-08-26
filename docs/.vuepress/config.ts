import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import { baiduAnalyticsPlugin } from "@vuepress/plugin-baidu-analytics";
import { myTheme } from "./theme";

export default defineUserConfig({
    base: '/fastapi_best_architecture_docs/',
    lang: 'zh-CN',
    title: 'FastAPI Best Architecture',
    head: [
        ['link', { rel: 'icon', href: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.svg' }],
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'FastAPI Best Architecture',
            description: '基于 FastAPI 构建的企业级后端架构解决方案',
        },
        '/en/': {
            lang: 'en-US',
            title: 'FastAPI Best Architecture',
            description: 'Enterprise-grade backend architecture solution built with FastAPI',
        },
    },
    theme: myTheme,
    plugins: [
        baiduAnalyticsPlugin({
            id: '3fac49b26d8f26702c22aad4381c0641'
        }),
    ],
    bundler: viteBundler({
        viteOptions: {
            optimizeDeps: {
                include: [
                    'mark.js/src/vanilla.js',
                    '@vueuse/integrations/useFocusTrap',
                    'minisearch',
                ],
            },
            server: {
                watch: {
                    ignored: [
                        '**/.vuepress/.cache/**',
                        '**/.vuepress/.temp/**',
                        '**/.vuepress/dist/**',
                    ],
                },
            },
        },
    }),
    shouldPrefetch: false,
})
