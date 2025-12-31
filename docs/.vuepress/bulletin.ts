import { BulletinOptions } from "vuepress-theme-plume";
// @ts-ignore
import path from 'node:path'

export const myBulletin: BulletinOptions = {
    // layout: 'center',
    border: true,
    enablePage: false,
    lifetime: 'session',
    title: '公告',
    contentFile: path.join(__dirname, '_bulletin.md'),
}
