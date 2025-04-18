import { ref } from "vue";

const sponsorUrl: string = typeof window !== 'undefined' ? window.location.origin + '/fastapi_best_architecture_docs/sponsors.html' : 'https://fastapi-practices.github.io/fastapi_best_architecture_docs/sponsors.html';

export const goldSponsors = ref([
    {
        link: 'https://dscache.tencent-cloud.cn/upload//rhino-design-800x450-fea2ea55b7b63624628bf9bb22454cb8f91b7d69.png',
        text: '【腾讯云】春季大促，助力开工，2核2G云服务器低至 68元/年',
        href: 'https://curl.qcloud.com/f9VMAii8',
        alt: 'wu-clan',
    },
    {
        link: 'https://img13.360buyimg.com/ddimg/jfs/t1/275679/7/22994/37075/68020854Fd08000a0/74e3ddf58989dc45.jpg',
        text: '302.AI',
        href: 'https://share.302.ai/LJojhb',
        alt: 'wu-clan',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: 'wu-clan',
    }
])

export const generalSponsors = ref([
    {
        link: 'https://dscache.tencent-cloud.cn/upload//345_200-013e419e2b86ff48a531fabce2694bd3bb27f844.png',
        text: '【腾讯云】云服务器、云数据库、COS、CDN、短信等云产品特惠热卖中',
        href: 'https://curl.qcloud.com/s5LIubk6',
        alt: 'wu-clan',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: 'wu-clan',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: 'wu-clan',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: 'wu-clan',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: 'wu-clan',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: 'wu-clan',
    }
])
