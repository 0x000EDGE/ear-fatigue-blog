// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/image",
        "@nuxt/ui",
        "@nuxt/content",
        "@vueuse/nuxt",
        "nuxt-og-image",
        "motion-v/nuxt",
    ],

    devtools: {
        enabled: true,
    },

    css: ["~/assets/css/main.css"],

    content: {
        experimental: {
            sqliteConnector: "native",
        },
    },

    icon: {
        customCollections: [
            {
                prefix: "custom", // Le préfixe que tu utiliseras dans UIcon
                dir: "~/assets/icons", // Le dossier contenant tes fichiers .svg
            },
        ],
    },

    compatibilityDate: "2026-06-30",

    ogImage: {
        zeroRuntime: true,
    },

    prerender: {
        routes: ["/"],
        crawlLinks: true,
    },
});
