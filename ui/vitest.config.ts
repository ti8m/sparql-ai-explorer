import {defineVitestConfig} from "@nuxt/test-utils/config";

export default defineVitestConfig({
    test: {
        globals: true,
        environment: "nuxt",
        environmentOptions: {
            nuxt: {
                overrides: {
                    plugins: ["~~/tests/mockData/version.client.ts"],
                },
            },
        },
    },
});
