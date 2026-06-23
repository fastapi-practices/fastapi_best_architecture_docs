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
    //{
    //    link: 'https://u.bws.lol/templates/lagom2/assets/img/logo/logo_big_inverse.1753622506.png',
    //    href: 'https://u.bws.lol/aff.php?aff=12215',
    //    alt: 'Bywave',
    //    expiryTime: '2099-12-31T23:59:59',
    //},
    {
        link: 'https://cdn5.telesco.pe/file/mL5FgURZAJEoIHxEp84vXFkTfZpSaDDBYauk_PAw0bKaBWpLYgWkjAHboM_vpPe-VAJvD_KcCdKT8ph7T6sYqBpzOZnibPTurIpus_esTKdEVhLRNHzGZj6yCU92mSH4fx_oh_qZFrKr_sGLOEat9WyPbUMfXDNQOJKm6WEDEZhtU2U_tRuFi-XiIYp4Pc5NiSJsCsUO3E7NgRgWLFGklXTsrXm1kPaGgPU1KCaJUj_MhFwAb_6VNkq2k6VBWIFI3wFotH-t-ugZ5e3faQuG4m1VINZQDYt_mjFhc5I2-iif9WMkj7DsXEOMV5tCl-gGXgIlw3nTpd9D0DHswSi3XQ.jpg',
        href: 'https://xn--mesr8b36x.com/#/register?code=vpybf4Rw',
        alt: '大机场',
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
    // @ts-ignore
    if (!sponsor.alt.includes('成为赞助商') && sponsor.expiryTime) {
        const now = new Date();
        const expiryDate = new Date(sponsor.expiryTime);
        return now < expiryDate;
    }
    return false;
}
