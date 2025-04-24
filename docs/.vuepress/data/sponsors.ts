export const sponsorUrl: string = typeof window !== 'undefined' ? window.location.origin + '/fastapi_best_architecture_docs/sponsors.html' : 'https://fastapi-practices.github.io/fastapi_best_architecture_docs/sponsors.html';

interface Sponsor {
    href?: string;
    link?: string;
    alt?: string;
    expiryTime: string; // ISO 格式日期：2099-12-31T23:59:59
}

export const defaultSponsor: Sponsor = {
    link: '',
    href: sponsorUrl,
    alt: '成为赞助商',
    expiryTime: '2099-12-31T23:59:59',
};

export const homeSponsor: Sponsor = { ...defaultSponsor };


export const goldSponsors: Sponsor[] = [
    {
        link: 'https://dscache.tencent-cloud.cn/upload//rhino-design-800x450-fea2ea55b7b63624628bf9bb22454cb8f91b7d69.png',
        href: 'https://curl.qcloud.com/f9VMAii8',
        alt: '2核2G云服务器低至 68元/年',
        expiryTime: '2025-12-31T23:59:59',
    },
    {
        link: 'https://img14.360buyimg.com/ddimg/jfs/t1/284966/5/22913/37242/68023351Faddd8304/6337ad52ea02ad10.jpg',
        href: 'https://share.302.ai/LJojhb',
        alt: '302.AI',
        expiryTime: '2025-05-18T16:35:00',
    },
    { ...defaultSponsor }
]

export const generalSponsors: Sponsor[] = [
    {
        link: 'https://user.by.ltd/templates/lagom/assets/img/logo/logo_big.png',
        href: 'https://user.by.ltd/aff.php?aff=12215',
        alt: 'Bywave',
        expiryTime: '2099-12-31T23:59:59',
    },
    { ...defaultSponsor },
    { ...defaultSponsor },
    { ...defaultSponsor },
    { ...defaultSponsor },
    { ...defaultSponsor }
]

export const openSponsorLink = (href: string) => {
    window.open(href);
};

export function shouldShowSponsor(sponsor: {
    href?: string;
    link?: string;
    expiryTime?: string;
}): boolean {
    if (!sponsor.link) return false;

    if (sponsor.expiryTime) {
        const now = new Date();
        const expiryDate = new Date(sponsor.expiryTime);
        return now < expiryDate;
    }

    return true;
}
