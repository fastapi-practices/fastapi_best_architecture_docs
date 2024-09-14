import {defineNavbarConfig} from "vuepress-theme-plume";

export const myNavbar = defineNavbarConfig([
    {
        text: '技术支持',
        icon: 'fluent-emoji-flat:unicorn',
        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/issues'
    },
    {
        text: '赞助',
        icon: 'ci:coffee',
        link: 'https://wu-clan.github.io/sponsor/'
    }
])
