import { BulletinOptions } from "vuepress-theme-plume";
import path from 'node:path'

export const myBulletin: BulletinOptions = {
    // layout: 'center',
    border: true,
    enablePage: true,
    lifetime: 'session',
    title: '🎉 v1.11.1 已发布 🎉',
    contentFile: path.join(__dirname, '_bulletin.md'),
}
