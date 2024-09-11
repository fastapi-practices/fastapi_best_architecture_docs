import {defineNotesConfig} from "vuepress-theme-plume";

export const myNotes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [
        {
            dir: 'deploy',
            link: '/deploy/',
            sidebar: 'auto',
        }
    ]
})
