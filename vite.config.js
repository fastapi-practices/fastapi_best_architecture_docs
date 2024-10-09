export default defineConfig({
    optimizeDeps: {
        include: [
            'mark.js/src/vanilla.js',
            '@vueuse/integrations/useFocusTrap',
            'minisearch',
        ],
    },
})
