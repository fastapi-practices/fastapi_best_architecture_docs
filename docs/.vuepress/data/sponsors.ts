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
    expiryTime: '2099-12-31T23:59:59',
};

export const homeSponsor: Sponsor = { ...defaultSponsor };


export const goldSponsors: Sponsor[] = [
    {
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQImbvY5S8IbJ1iL6yHfExtHiAhUtLIoi7AQ&s',
        href: 'https://user.by.ltd/aff.php?aff=12215',
        alt: 'Bywave',
        expiryTime: '2099-12-31T23:59:59',
    },
    {
        link: 'https://www.serpshot.com/logo.png',
        href: 'https://www.serpshot.com',
        alt: 'Serpshot',
        expiryTime: '2099-12-31T23:59:59',
    },
    { ...defaultSponsor }
]

export const generalSponsors: Sponsor[] = [
    { ...defaultSponsor }
]

export const openSponsorLink = (href: string, target?: string) => {
    window.open(href, target || '_self');
};

export function shouldShowSponsor(sponsor: Sponsor): boolean {
    if (!sponsor.alt.includes('成为赞助商') && sponsor.expiryTime) {
        const now = new Date();
        const expiryDate = new Date(sponsor.expiryTime);
        return now < expiryDate;
    }
    return false;
}
