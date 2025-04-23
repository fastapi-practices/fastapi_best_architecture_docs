import { ref } from "vue";

const sponsorUrl: string = typeof window !== 'undefined' ? window.location.origin + '/fastapi_best_architecture_docs/sponsors.html' : 'https://fastapi-practices.github.io/fastapi_best_architecture_docs/sponsors.html';

export const homeSponsor = ref(
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: 'fba 官方合作伙伴'
    }
)

export const goldSponsors = ref([
    {
        link: '',
        text: '【腾讯云】春季大促，助力开工，2核2G云服务器低至 68元/年',
        href: 'https://curl.qcloud.com/f9VMAii8',
        alt: '',
    },
    {
        link: 'https://img14.360buyimg.com/ddimg/jfs/t1/284966/5/22913/37242/68023351Faddd8304/6337ad52ea02ad10.jpg',
        text: '302.AI',
        href: 'https://share.302.ai/LJojhb',
        alt: '',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: '',
    }
])

export const generalSponsors = ref([
    {
        link: 'https://user.by.ltd/templates/lagom/assets/img/logo/logo_big.png',
        text: 'Bywave',
        href: 'https://user.by.ltd/aff.php?aff=12215',
        alt: '',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: '',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: '',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: '',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: '',
    },
    {
        link: '',
        text: '成为赞助商',
        href: sponsorUrl,
        alt: '',
    }
])
