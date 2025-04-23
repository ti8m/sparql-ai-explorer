export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.AI_API_PATH}/generate_sparql`;
    const body = await readBody(event);

    if (!body) {
        throw new Error(`What would you expect for asking nothing?`);
    }

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query: body, language: "en"}),
        });

        const data = await response.json();
        return {
            success: data.result,
            query: data.data.query,
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
});
