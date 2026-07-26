import { BulletinOptions } from "vuepress-theme-plume";
// @ts-ignore
import path from 'node:path'

const baseBulletin: Omit<BulletinOptions, 'title' | 'contentFile'> = {
    layout: 'bottom-right',
    border: true,
    enablePage: false,
    lifetime: 'session',
}

export const myBulletin: BulletinOptions = {
    ...baseBulletin,
    title: '公告',
    contentFile: path.join(__dirname, '_bulletin.md'),
}

export const myBulletinEn: BulletinOptions = {
    ...baseBulletin,
    title: 'Bulletin',
    contentFile: path.join(__dirname, '_bulletin.en.md'),
}
