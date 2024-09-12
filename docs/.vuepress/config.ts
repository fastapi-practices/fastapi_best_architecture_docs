import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'
import {myNavbar} from "./navbar";
import {myNotes} from "./notes";

export default defineUserConfig({
    lang: 'zh-CN',
    theme: plumeTheme({
        notes: {
            dir: '/notes/',
            link: '/',
            notes: [myNotes]
        },
        navbar: myNavbar,
        logo: 'https://fastapi.tiangolo.com/img/icon-white.svg',
        docsRepo: 'https://github.com/fastapi-practices/fastapi_best_architecture_docs',
        docsBranch: 'master',
        docsDir: 'docs',
        footer: {
            message: 'MIT License ',
            copyright: 'Copyright © 2024-present FastAPI Practices'
        },
        plugins: {
            watermark: true,
            markdownPower: {
                icons: true,
            }
        }
    }),
    bundler: viteBundler(),
})
