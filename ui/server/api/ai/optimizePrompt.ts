export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.AI_API_PATH}/optimize_sparql`;
    const {originalQuery, optimizationRequest} = await readBody(event);

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                originalQuery,
                optimizationRequest,
            }),
        });

        const data = await response.json();
        return {
            result: data.result,
            query: data.data.query,
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
});
