import { myNavbar } from "./navbar";
import { mySidebar } from "./sidebar";
import { defineUserConfig } from "vuepress";
import plumeTheme from "vuepress-theme-plume";
import { viteBundler } from '@vuepress/bundler-vite'
import { myBulletin } from "./bulletin";
import { baiduAnalyticsPlugin } from "@vuepress/plugin-baidu-analytics";
import { umamiAnalyticsPlugin } from "@vuepress/plugin-umami-analytics";


export default defineUserConfig({
    base: '/fastapi_best_architecture_docs/',
    lang: 'zh-CN',
    title: 'FastAPI Best Architecture',
    head: [
        ['link', { rel: 'icon', href: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.svg' }],
    ],
    plugins: [
        baiduAnalyticsPlugin({
            id: '6202e3701ae5a932577a1cf195084e9e'
        }),
        umamiAnalyticsPlugin({
            id: '62984e7c-ec95-459a-9a2f-553766c6b3d4'
        })
    ],
    theme: plumeTheme({
        hostname: 'https://fastapi-practices.github.io/fastapi_best_architecture_docs/',
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png',
        docsRepo: 'https://github.com/fastapi-practices/fastapi_best_architecture_docs',
        docsBranch: 'master',
        docsDir: 'docs',
        blog: false,
        notes: false,
        bulletin: myBulletin,
        sidebar: mySidebar,
        sidebarScrollbar: false,
        navbar: myNavbar,
        autoFrontmatter: {
            title: true,
            permalink: false,
            createTime: false,
        },
        social: [
            { icon: 'github', link: 'https://github.com/fastapi-practices/fastapi_best_architecture' },
            {
                icon: {
                    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.59.59 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>`,
                    name: 'gitee'
                },
                link: 'https://gitee.com/wu_clan/fastapi_best_architecture'
            },
            { icon: 'bilibili', link: 'https://space.bilibili.com/284237214' }
        ],
        navbarSocialInclude: ['github', 'gitee', 'bilibili'],
        editLinkText: '编辑此页面',
        contributors: false,
        lastUpdated: false,
        footer: {
            copyright: 'Copyright © 2023-present FastAPI Practices'
        },
        //watermark: true,
        markdown: {
            abbr: true,
            annotation: true,
            mermaid: true,
        },
        codeHighlighter: {
            themes: {
                dark: 'one-dark-pro',
                light: 'one-light'
            }
        },
        comment: {
            provider: 'Giscus',
            comment: true,
            repo: 'fastapi-practices/fastapi_best_architecture_docs',
            repoId: 'R_kgDOMv5sMQ',
            category: 'Comment',
            categoryId: 'DIC_kwDOMv5sMc4CmLp9',
            lazyLoading: true,
        },
    }),
    bundler: viteBundler(),
    shouldPrefetch: false,
})
