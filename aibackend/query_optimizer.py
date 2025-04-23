from langchain.prompts import ChatPromptTemplate
from starlette.responses import JSONResponse
from utils import commands
from utils import ontology
from utils import prefixes
from utils import remove_invalid_syntax_elements
from gpt_model import gpt4o_model
from model.answer import Answer
from model.query_optimization_request import QueryOptimizationRequest


input = ChatPromptTemplate.from_messages([
    ('system', 'you are a natural language to SPARQL converter'),
    ('user',
     """The following SPARQL query is not optimal:
     ```quote
     {originalQuery}
     ```
     Please consider the optimization request below the following sparql query:
     ```quote
     {optimizationRequest}
     ```
     And send back an optimized sparql query of the form:
     
     {{
       "query": "<FULL SPARQL query>",
       "explanation": "explain how your correction corresponds to the optimizationRequest and why the new query is better than the original one"
     }}
     
     Use following prefixes in the SPARQL query where necessary, but keep the original prefixes:
     ```
     {prefixes}
     ```
     The following ontology was used for the original query, use it also for the optimized query:
     ```ontology
     {ontology}
     ```
     
     Use following task and command pairs as guidance:
     ```
     {commands}
     ```
     
     """
     )])

def optimize_sparql(optimizationRequest: QueryOptimizationRequest):
    try:
        content = (input | gpt4o_model()).invoke(
            input={'originalQuery': optimizationRequest.originalQuery,
                   'optimizationRequest': optimizationRequest.optimizationRequest,
                   'ontology': ontology, 'commands': commands, 'prefixes': prefixes}).content
        answer = Answer.model_validate_json(content)
        final_answer = {key: str(value) for key, value in answer.model_dump().items()}
        final_answer['query'] = remove_invalid_syntax_elements(final_answer['query'])
        return JSONResponse(content={"result": "ok", "data": final_answer})
    except Exception as e:
        return JSONResponse(content={"result": "error", "message": str(e)})
