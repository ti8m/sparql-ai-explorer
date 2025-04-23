from pydantic import BaseModel


class QueryOptimizationRequest(BaseModel):
    originalQuery: str
    optimizationRequest: str
