from pydantic import BaseModel


class QueryRequest(BaseModel):
    language: str
    query: str
