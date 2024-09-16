import {defineNavbarConfig} from "vuepress-theme-plume";

export const myNavbar = defineNavbarConfig([
    {
        text: '演示',
        items: [
            {
                text: 'Arco Design Pro 版本',
                link: 'https://fba.xwboy.top/'
            }
        ]
    },
    {
        text: 'Beta',
        items: [
            {
                text: '贡献',
                link: 'https://github.com/fastapi-practices/fastapi_best_architecture/tree/master/backend#readme'
            }
        ]
    },
    {
        text: '技术支持',
        icon: 'fluent-emoji-high-contrast:unicorn',
        link: 'https://github.com/fastapi-practices/fastapi_best_architecture/issues'
    },
    {
        text: '赞助',
        icon: 'ci:coffee',
        link: 'https://wu-clan.github.io/sponsor/'
    },
    {
        text: '互动',
        icon: 'mage:we-chat',
        link: 'https://wu-clan.github.io/homepage/'
    },
    {
        text: '友情链接',
        icon: 'fa-solid:user-friends',
        link: '/friends'
    }
])
