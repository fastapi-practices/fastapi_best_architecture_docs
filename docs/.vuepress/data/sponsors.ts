export const sponsorUrl: string = typeof window !== 'undefined' ? window.location.origin + '/fastapi_best_architecture_docs/sponsors.html' : 'https://fastapi-practices.github.io/fastapi_best_architecture_docs/sponsors.html';

export interface Sponsor {
    link: string;
    href?: string;
    alt?: string;
    expiryTime: string; // ISO 格式日期：2099-12-31T23:59:59
}

export const defaultSponsor: Sponsor = {
    link: '',
    href: sponsorUrl,
    alt: '成为赞助商',
    expiryTime: '',
};

export const homeSponsor: Sponsor = { ...defaultSponsor };


export const goldSponsors: Sponsor[] = [
    {
        link: 'https://img14.360buyimg.com/ddimg/jfs/t1/284966/5/22913/37242/68023351Faddd8304/6337ad52ea02ad10.jpg',
        href: 'https://share.302.ai/LJojhb',
        alt: '302.AI',
        expiryTime: '2025-06-18T16:35:00',
    }
]

export const generalSponsors: Sponsor[] = [
    {
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQImbvY5S8IbJ1iL6yHfExtHiAhUtLIoi7AQ&s',
        href: 'https://user.by.ltd/aff.php?aff=12215',
        alt: 'Bywave',
        expiryTime: '2099-12-31T23:59:59',
    },
    { ...defaultSponsor }
]

export const openSponsorLink = (href: string) => {
    window.open(href);
};

export function shouldShowSponsor(expiryTime?: string): boolean {
    if (expiryTime) {
        const now = new Date();
        const expiryDate = new Date(expiryTime);
        return now < expiryDate;
    }
    return false;
}
