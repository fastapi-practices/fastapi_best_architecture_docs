import { BulletinOptions } from "vuepress-theme-plume";
// @ts-ignore
import path from 'node:path'

export const myBulletin: BulletinOptions = {
    layout: 'bottom-right',
    border: true,
    enablePage: true,
    lifetime: 'session',
    title: '公告',
    contentFile: path.join(__dirname, '_bulletin.md'),
}
