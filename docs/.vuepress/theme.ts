import plumeTheme from "vuepress-theme-plume";
import { Theme } from "vuepress";
import { myBulletin, myBulletinEn } from "./bulletin";
import { zhSidebar, enSidebar } from "./sidebar";
import { zhNavbar, enNavbar } from "./navbar";

export const createTheme = (hostname: string): Theme => plumeTheme({
  hostname,
  logo: "https://wu-clan.github.io/picx-images-hosting/logo/fba.png",
  docsRepo:
    "https://github.com/fastapi-practices/fastapi_best_architecture_docs",
  docsBranch: "master",
  docsDir: "docs",
  social: [
    {
      icon: "github",
      link: "https://github.com/fastapi-practices/fastapi-best-architecture",
    },
  ],
  navbarSocialInclude: ["github"],
  lastUpdated: false,
  contributors: false,
  //watermark: true,
  markdown: {
    chat: true,
    mermaid: true,
    collapse: true,
  },
  codeHighlighter: {
    themes: {
      dark: "one-dark-pro",
      light: "one-light",
    },
  },
  comment: {
    provider: "Giscus",
    comment: true,
    repo: "fastapi-practices/fastapi_best_architecture_docs",
    repoId: "R_kgDOMv5sMQ",
    category: "Comment",
    categoryId: "DIC_kwDOMv5sMc4CmLp9",
    lazyLoading: true,
  },
  // Global: never auto-write permalink/createTime into ordinary docs.
  autoFrontmatter: {
    title: true,
    permalink: false,
    createTime: false,
  },
  llmstxt: {
    locale: "/",
  },
  locales: {
    "/": {
      selectLanguageName: "简体中文",
      selectLanguageText: "选择语言",
      selectLanguageAriaLabel: "选择语言",
      editLinkText: "编辑此页面",
      collections: [
        {
          type: "post",
          dir: "blog",
          title: "博客",
          // Only files under blog/; do not broaden include to the whole docs tree.
          include: ["*.md"],
          // Blog posts already carry permalink/createTime in source.
          autoFrontmatter: {
            title: true,
            permalink: false,
            createTime: false,
          },
        },
      ],
      profile: {
        name: "wu-clan",
        description: "An open-source enthusiast, creator and contributor",
        avatar: "https://wu-clan.github.io/picx-images-hosting/avatar.gif",
        location: "郑州，河南",
        organization: "FastAPI Practices",
        circle: true,
        layout: "right",
      },
      bulletin: myBulletin,
      sidebar: zhSidebar,
      sidebarScrollbar: false,
      navbar: zhNavbar,
    },
    "/en/": {
      selectLanguageName: "English",
      selectLanguageText: "Languages",
      selectLanguageAriaLabel: "Select language",
      editLinkText: "Edit this page",
      collections: [
        {
          type: "post",
          dir: "blog",
          title: "Blog",
          include: ["*.md"],
          autoFrontmatter: {
            title: true,
            permalink: false,
            createTime: false,
          },
        },
      ],
      profile: {
        name: "wu-clan",
        description: "An open-source enthusiast, creator and contributor",
        avatar: "https://wu-clan.github.io/picx-images-hosting/avatar.gif",
        location: "Zhengzhou, Henan",
        organization: "FastAPI Practices",
        circle: true,
        layout: "right",
      },
      bulletin: myBulletinEn,
      sidebar: enSidebar,
      sidebarScrollbar: false,
      navbar: enNavbar,
    },
  },
});

export const myTheme: Theme = createTheme("https://fastapi-practices.github.io");
