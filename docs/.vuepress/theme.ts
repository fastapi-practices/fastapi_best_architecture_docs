import plumeTheme from "vuepress-theme-plume";
import { Theme } from "vuepress";
import { myBulletin } from "./bulletin";
import { mySidebar } from "./sidebar";
import { myNavbar } from "./navbar";


export const myTheme: Theme = plumeTheme({
    hostname: 'https://fastapi-practices.github.io/fastapi_best_architecture_docs/',
    logo: 'https://wu-clan.github.io/picx-images-hosting/logo/fba.png',
    docsRepo: 'https://github.com/fastapi-practices/fastapi_best_architecture_docs',
    docsBranch: 'master',
    docsDir: 'docs',
    collections: [
        {
            type: 'post',
            dir: 'blog',
            title: '博客',
            include: ['**/*.md'],
        }
    ],
    profile: {
        name: 'wu-clan',
        description: 'An open-source enthusiast, creator and contributor',
        avatar: 'https://wu-clan.github.io/picx-images-hosting/avatar.gif',
        location: '郑州，河南',
        organization: 'FastAPI Practices',
        circle: true,
        layout: 'right',
    },
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
                svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="margin: -2px 0 0 -2px" viewBox="0 0 24 24"><path fill="currentColor" d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.59.59 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>`,
                name: 'gitee'
            },
            link: 'https://gitee.com/wu_clan/fastapi_best_architecture'
        },
    ],
    navbarSocialInclude: ['github', 'gitee'],
    editLinkText: '编辑此页面',
    lastUpdated: false,
    contributors: false,
    //watermark: true,
    markdown: {
        abbr: true,
        annotation: true,
        chat: true,
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
    llmstxt: true,
})