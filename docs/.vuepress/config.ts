import {myNavbar} from "./navbar";
import {mySidebar} from "./sidebar";
import {defineUserConfig} from "vuepress";
import plumeTheme from "vuepress-theme-plume";
import {viteBundler} from '@vuepress/bundler-vite'
import {myBulletin} from "./bulletin";


export default defineUserConfig({
    base: '/fastapi_best_architecture_docs/',
    lang: 'zh-CN',
    title: 'FastAPI Best Architecture',
    head: [
        ['link', {rel: 'icon', href: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.svg'}]
    ],
    theme: plumeTheme({
        blog: false,
        notes: false,
        autoFrontmatter: {
            title: true,
            permalink: false,
            createTime: false,
        },
        bulletin: myBulletin,
        sidebar: mySidebar,
        navbar: myNavbar,
        logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png',
        docsRepo: 'https://github.com/fastapi-practices/fastapi_best_architecture_docs',
        docsBranch: 'master',
        docsDir: 'docs',
        social: [
            {icon: 'github', link: 'https://github.com/fastapi-practices/fastapi_best_architecture'},
            {icon: 'discord', link: 'https://discord.com/invite/yNN3wTbVAC'}
        ],
        // navbarSocialInclude: ['github'],
        editLinkText: '在 GitHub 上编辑此页面',
        lastUpdated: false,
        contributors: false,
        footer: {
            message: 'MIT License',
            copyright: 'Copyright © 2024-present FastAPI Practices'
        },
        plugins: {
            shiki: {
                languages: ['shell', 'yaml', 'py']
            },
            watermark: true,
            markdownPower: {
                icons: true,
                bilibili: true,
            },
        },
    }),
    bundler: viteBundler(),
})
