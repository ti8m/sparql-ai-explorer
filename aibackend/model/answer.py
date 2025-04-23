from pydantic import BaseModel


class Answer(BaseModel):
    query: str
    explanation: str
