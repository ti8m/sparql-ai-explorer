from langchain.prompts import ChatPromptTemplate
from starlette.responses import JSONResponse
from utils import commands
from utils import ontology
from utils import prefixes
from utils import remove_invalid_syntax_elements
from gpt_model import gpt4o_model
from model.answer import Answer
from model.query_request import QueryRequest


input = ChatPromptTemplate.from_messages([
    ('system', 'you are a natural language to SPARQL converter'),
    ('user',
     """Return a SPARQL query that answers the following question:
     ```quote
     {query}
     ```
     Very important: Make sure that you define the necessary prefixes in the query and that the query is syntactically correct.     
     The query should not have any characters or symbols which are not part of the SPARQL syntax.
     Also, the sparql query must be based on following ontology:
     
     ```ontology
     {ontology}
     ```
     
     Use following task and command pairs as guidance:
     ```
     {commands}
     ```
     
     Use following prefixes in the SPARQL query, but the rdf and parl prefix is always to use whether needed or not:
     ```
     {prefixes}
     ```
     
     always generate the explanation before you generate the query and then think once again about the task and the explanation, before you generate the query.
     
     Answer in json of the form:
     {{
       "query": "<FULL SPARQL query>",
       "explanation": "explain what you're going to do and explain how every element of the query complies with the ontology or the sparql syntax"
     }}
     
     """
     )])


def generate_sparql(queryRequest: QueryRequest):
    try:
        content = (input | gpt4o_model()).invoke(
            input={'query': queryRequest.query, 'ontology': ontology, 'commands': commands,
                   'prefixes': prefixes}).content
        answer = Answer.model_validate_json(content)
        final_answer = {key: str(value) for key, value in answer.model_dump().items()}
        final_answer['query'] = remove_invalid_syntax_elements(final_answer['query'])
        return JSONResponse(content={"result": "ok", "data": final_answer})
    except Exception as e:
        return JSONResponse(content={"result": "error", "message": str(e)})
