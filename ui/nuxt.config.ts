// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    plugins:
        process.env.NODE_ENV !== "test" ? ["~~/plugins/version.client.ts"] : [],
    colorMode: {
        preference: "light",
        fallback: "light",
    },
    modules: [
        "@nuxt/ui",
        "@nuxtjs/color-mode",
        "@nuxt/eslint",
        "@nuxt/test-utils/module",
        "nuxt-codemirror",
    ],
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: "2025-07-01",
    tailwindcss: {
        configPath: "tailwind.config.ts",
    },
    runtimeConfig: {
        public: {
            AI_API_PATH: process.env.NUXT_AI_API_PATH,
            FUSEKI_API_PATH: process.env.NUXT_FUSEKI_API_PATH,
        },
    },
});
