export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.FUSEKI_API_PATH}/sparql`;
    const sparqlQuery = await readBody(event);

    if (!sparqlQuery) {
        throw new Error(`SPARQL query is required.`);
    }

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/sparql-query",
                Accept: "application/sparql-results+json",
                "User-Agent":
                    "MyNuxtApp/1.0 (https://myapp.example.com; contact@example.com)",
            },
            body: sparqlQuery,
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
});
