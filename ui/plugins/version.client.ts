export default defineNuxtPlugin(async (nuxtApp) => {
    const packageJson = await import("../package.json");

    if (import.meta.client) {
        nuxtApp.provide("version", packageJson.version);
    }
});
