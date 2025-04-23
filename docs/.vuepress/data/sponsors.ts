import { ref } from "vue";

export const sponsorUrl: string = typeof window !== 'undefined' ? window.location.origin + '/fastapi_best_architecture_docs/sponsors.html' : 'https://fastapi-practices.github.io/fastapi_best_architecture_docs/sponsors.html';

export const homeSponsor = ref(
    {
        link: '',
        href: sponsorUrl,
        alt: '',
    }
)

export const goldSponsors = ref([
    {
        link: 'https://dscache.tencent-cloud.cn/upload//rhino-design-800x450-fea2ea55b7b63624628bf9bb22454cb8f91b7d69.png',
        href: 'https://curl.qcloud.com/f9VMAii8',
        alt: '2核2G云服务器低至 68元/年',
    },
    {
        link: 'https://img14.360buyimg.com/ddimg/jfs/t1/284966/5/22913/37242/68023351Faddd8304/6337ad52ea02ad10.jpg',
        href: 'https://share.302.ai/LJojhb',
        alt: '302.AI',
    },
    {
        link: '',
        href: sponsorUrl,
        alt: '成为赞助商',
    }
])

export const generalSponsors = ref([
    {
        link: 'https://user.by.ltd/templates/lagom/assets/img/logo/logo_big.png',
        href: 'https://user.by.ltd/aff.php?aff=12215',
        alt: 'Bywave',
    },
    {
        link: '',
        href: sponsorUrl,
        alt: '成为赞助商',
    },
    {
        link: '',
        href: sponsorUrl,
        alt: '成为赞助商',
    },
    {
        link: '',
        href: sponsorUrl,
        alt: '成为赞助商',
    },
    {
        link: '',
        href: sponsorUrl,
        alt: '成为赞助商',
    },
    {
        link: '',
        href: sponsorUrl,
        alt: '成为赞助商',
    }
])
