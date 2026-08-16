import { withBase } from 'vuepress/client';

const sponsorPath = withBase('/sponsors.html');

export const sponsorUrl: string = typeof window !== 'undefined' ? window.location.origin + sponsorPath : sponsorPath;

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
    { ...defaultSponsor }
]

export const generalSponsors: Sponsor[] = [
    {
        link: 'https://u.bws.lol/favicon.png',
        href: 'https://u.bws.lol/register?aff=SLMYG84W',
        alt: 'Bywave',
        expiryTime: '2099-12-31T23:59:59',
    },
    {
        link: '',
        href: 'https://xn--mesr8b36x.com/#/register?code=vpybf4Rw',
        alt: '大机场',
        expiryTime: '2099-12-31T23:59:59',
    },
    { ...defaultSponsor }
]

export const openSponsorLink = (href: string, target?: string) => {
    window.open(href, target || '_self');
};

export function shouldShowSponsor(sponsor: Sponsor): boolean {
    // @ts-ignore
    if (!sponsor.alt.includes('成为赞助商') && sponsor.expiryTime) {
        const now = new Date();
        const expiryDate = new Date(sponsor.expiryTime);
        return now < expiryDate;
    }
    return false;
}
