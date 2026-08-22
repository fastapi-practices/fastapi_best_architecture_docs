import { withBase } from 'vuepress/client';

const sponsorPath = withBase('/sponsors.html');

export const sponsorUrl: string = typeof window !== 'undefined' ? window.location.origin + sponsorPath : sponsorPath;

export interface Sponsor {
    link: string;
    href?: string;
    alt?: string;
    expiryTime: string; // ISO 格式日期：2099-12-31T23:59:59
    /** 透明单色 Logo 的墨色：white 浅色主题反色，black 深色主题反色，满版/带背景图不填 */
    ink?: 'white' | 'black';
}

export const defaultSponsor: Sponsor = {
    link: '',
    href: sponsorUrl,
    alt: '成为赞助商',
    expiryTime: '2099-12-31T23:59:59',
};

export const homeSponsor: Sponsor = {
    link: 'https://purple-sun-4f5a.wuyao1243.workers.dev/',
    href: 'https://claude.uy/home',
    alt: 'Claude.uy',
    expiryTime: '2099-12-31T23:59:59',
};


export const goldSponsors: Sponsor[] = [
    { ...defaultSponsor }
]

export const generalSponsors: Sponsor[] = [
    {
        link: 'https://u.bws.lol/bywave-brand.png',
        href: 'https://u.bws.lol/register?aff=SLMYG84W',
        alt: 'Bywave',
        expiryTime: '2099-12-31T23:59:59',
        ink: 'white',
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

const PLACEHOLDER_ALT = '成为赞助商';

/** 各展位席位上限，银牌展位不限席 */
export const boothCapacity = {
    exclusive: 1,
    gold: 3,
} as const;

/**
 * 展位横版图比例
 * 素材对应 Sponsor 字段：link 横版图链接、alt 品牌名、href 跳转链接
 */
export const boothAspectRatio = {
    exclusive: '7:3',
    gold: '7:3',
    silver: '5:3',
} as const;

export type BoothKey = keyof typeof boothAspectRatio;

export function getBoothAspectRatio(key: string): string | undefined {
    return boothAspectRatio[key as BoothKey];
}

export function shouldShowSponsor(sponsor: Sponsor): boolean {
    if (!sponsor.alt || sponsor.alt.includes(PLACEHOLDER_ALT) || !sponsor.expiryTime) {
        return false;
    }
    return new Date() < new Date(sponsor.expiryTime);
}

export function getActiveSponsors(sponsors: Sponsor[]): Sponsor[] {
    return sponsors.filter(shouldShowSponsor);
}

export function getBoothOccupiedCount(key: string): number {
    switch (key) {
        case 'exclusive':
            return shouldShowSponsor(homeSponsor) ? 1 : 0;
        case 'gold':
            return getActiveSponsors(goldSponsors).length;
        case 'silver':
            return getActiveSponsors(generalSponsors).length;
        default:
            return 0;
    }
}

export function isBoothFull(key: string): boolean {
    const capacity = boothCapacity[key as keyof typeof boothCapacity];
    if (!capacity) return false;
    return getBoothOccupiedCount(key) >= capacity;
}
