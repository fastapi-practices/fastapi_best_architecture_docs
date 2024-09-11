import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'
import {myNotes} from "./notes";
import {myNavbar} from "./navbar";

export default defineUserConfig({
    lang: 'zh-CN',
    theme: plumeTheme({
        notes: myNotes,
        navbar: myNavbar
    }),
    bundler: viteBundler(),
})
