from langchain_community.chat_models import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

def gpt4o_model():

    # Initialisiere das OpenAI GPT-4 Modell
    return ChatOpenAI(
        model="gpt-3.5-turbo",
        temperature=0.7,
        openai_api_key=os.getenv('OPENAI_API_KEY')
    )