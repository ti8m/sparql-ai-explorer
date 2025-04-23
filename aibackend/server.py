from model.answer import Answer
from model.query_optimization_request import QueryOptimizationRequest
from model.query_request import QueryRequest

from query_generator import generate_sparql
from query_optimizer import optimize_sparql

import nest_asyncio

import fastapi
import uvicorn

app = fastapi.FastAPI()


@app.post("/api/generate_sparql", response_model=Answer)
def generate_sparql_from_natural_language(queryRequest: QueryRequest):
    return generate_sparql(queryRequest)


@app.post("/api/optimize_sparql")
def optimize_sparql_according_to_optimization_request(optimizationRequest: QueryOptimizationRequest):
    return optimize_sparql(optimizationRequest)


# ONLY NEEDED IN JUPYTER NOTEBOOKS:
nest_asyncio.apply()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8091, reload=False)
