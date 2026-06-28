import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import { baiduAnalyticsPlugin } from "@vuepress/plugin-baidu-analytics";
import { clarityAnalyticsPlugin } from "@vuepress/plugin-clarity-analytics";
import { createTheme } from "./theme";

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'FastAPI Best Architecture',
    head: [
        ['link', { rel: 'icon', href: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.svg' }],
    ],
    theme: createTheme("https://docs.fba.wu-clan.cc"),
    plugins: [
        baiduAnalyticsPlugin({
            id: '3fac49b26d8f26702c22aad4381c0641'
        }),
        clarityAnalyticsPlugin({
            id: 'uhawbqsmxt'
        })
    ],
    bundler: viteBundler(),
    shouldPrefetch: false,
})
