import { defineNavbarConfig, ThemeNavItem } from "vuepress-theme-plume";

export const enNavbar: ThemeNavItem[] = defineNavbarConfig([
    {
        text: "Guide",
        icon: "material-symbols:menu-book-outline",
        items: [
            {
                text: "Engineering",
                items: [
                    {
                        text: "Architecture",
                        icon: "material-symbols:account-tree-outline",
                        link: "/en/architecture",
                    },
                    {
                        text: "CLI",
                        icon: "material-symbols:terminal",
                        link: "/en/cli",
                    },
                ],
            },
            {
                text: "Backend",
                items: [
                    {
                        text: "Quick Start",
                        icon: "material-symbols:rocket-launch-outline",
                        link: "/en/backend/summary/quick-start",
                    },
                    {
                        text: "API Docs",
                        icon: "material-symbols:description-outline",
                        link: "https://apifox.com/apidoc/shared-28a93f02-730b-4f33-bb5e-4dad92058cc0",
                    },
                ],
            },
            {
                text: "Frontend",
                items: [
                    {
                        text: "Arco UI",
                        badge: { text: "Deprecated", type: "danger" },
                        icon: "material-symbols:space-dashboard-outline",
                        link: "/en/frontend/summary/arco",
                    },
                    {
                        text: "Vben UI",
                        icon: "material-symbols:widgets-outline",
                        link: "/en/frontend/summary/intro",
                    },
                ],
            },
            {
                text: "More",
                items: [
                    {
                        text: "Changelog",
                        icon: "material-symbols:history",
                        link: "https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/CHANGELOG.md",
                    },
                    {
                        text: "Contributing",
                        icon: "material-symbols:group-add-outline",
                        link: "https://github.com/fastapi-practices/fastapi-best-architecture/tree/master/backend#contributing",
                    },
                ],
            },
        ],
    },
    {
        text: "AI Powered",
        icon: "fluent-emoji-flat:brain",
        items: [
            {
                text: "Skills",
                icon: "hugeicons:language-skill",
                link: "/en/ai/skills",
            },
            {
                text: "MCP",
                icon: "flat-color-icons:mind-map",
                link: "/en/ai/mcp",
            },
            {
                text: "Prompt",
                icon: "fluent-emoji-flat:memo",
                link: "/en/ai/prompt",
            },
            {
                text: "LLMs.txt",
                icon: "fluent-emoji-flat:robot",
                link: "/en/ai/llms",
            },
        ],
    },
    {
        text: "Ecosystem",
        icon: "material-symbols:hub-outline",
        items: [
            {
                text: "Resources",
                items: [
                    {
                        text: "Tech Stack",
                        icon: "material-symbols:stack",
                        link: "/en/stack",
                    },
                    {
                        text: "Official Open Source",
                        icon: "simple-icons:github",
                        link: "/en/open-source",
                    },
                    {
                        text: "Community Open Source",
                        icon: "material-symbols:groups-outline",
                        link: "/en/community-open-source",
                    },
                ],
            },
            {
                text: "Community",
                items: [
                    {
                        text: "Chat Groups",
                        icon: "ic:baseline-wechat",
                        link: "/en/group",
                    },
                    {
                        text: "Author Homepage",
                        icon: "mdi:web",
                        link: "https://wu-clan.github.io/homepage",
                    },
                    {
                        text: "GitHub Issues",
                        icon: "mdi:bug-outline",
                        link: "https://github.com/fastapi-practices/fastapi-best-architecture/issues",
                    },
                    {
                        text: "GitHub Discussions",
                        icon: "mdi:forum-outline",
                        link: "https://github.com/fastapi-practices/fastapi-best-architecture/discussions",
                    },
                    {
                        text: "Ideas & Suggestions",
                        icon: "material-symbols:lightbulb-outline",
                        link: "https://discord.gg/xp8M6nY4NA",
                    },
                    {
                        text: "Request Updates",
                        icon: "material-symbols:notifications-active-outline",
                        link: "https://discord.gg/JyedBeHXkn",
                    },
                ],
            },
            {
                text: "Courses",
                items: [
                    {
                        text: "Video Courses",
                        badge: { text: "Outdated", type: "danger" },
                        icon: "ri:bilibili-fill",
                        link: "https://space.bilibili.com/284237214/lists",
                    },
                ],
            },
            {
                text: "Updates",
                items: [
                    {
                        text: "Blog",
                        badge: { text: "Charge Station", type: "tip" },
                        icon: "material-symbols:article-outline",
                        link: "/en/blog/",
                    },
                ],
            },
        ],
    },
    {
        text: "Plugins",
        icon: "flat-color-icons:puzzle",
        items: [
            {
                text: "Docs",
                items: [
                    {
                        text: "Introduction",
                        icon: "flat-color-icons:document",
                        link: "/en/plugin/before",
                    },
                    {
                        text: "Plugin Development",
                        icon: "flat-color-icons:command-line",
                        link: "/en/plugin/dev",
                    },
                    {
                        text: "Plugin Sharing",
                        icon: "flat-color-icons:share",
                        link: "/en/plugin/share",
                    },
                    {
                        text: "Plugin Installation",
                        icon: "flat-color-icons:download",
                        link: "/en/plugin/install",
                    },
                ],
            },
            {
                text: "More",
                items: [
                    {
                        text: "Marketplace",
                        icon: "flat-color-icons:shop",
                        badge: { text: 'NEW', type: 'tip' },
                        link: "/en/marketplace",
                    },
                ],
            },
        ],
    },
    {
        text: "Pricing",
        icon: "streamline-color:bag-dollar",
        link: "/en/pricing",
    },
    {
        text: "Sponsors",
        icon: "fluent-emoji-flat:red-heart",
        link: "/en/sponsors",
    },
    {
        text: "About",
        icon: "material-symbols:info-outline",
        items: [
            {
                text: "FAQ",
                icon: "material-symbols:quiz-outline",
                link: "/en/questions.md",
            },
            {
                text: "User Registry",
                icon: "material-symbols:person-check-outline",
                link: "/en/users",
            },
            {
                text: "Community Team",
                icon: "material-symbols:group-outline",
                link: "/en/team",
            },
            {
                text: "Privacy Policy",
                icon: "material-symbols:policy-outline",
                link: "/en/privacy-policy",
            },
        ],
    },
]);
