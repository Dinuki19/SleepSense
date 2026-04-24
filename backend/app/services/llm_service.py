import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_llm_recommendations(prediction, input_data):

    prompt = f"""
    You are a sleep health assistant.

    Prediction: {prediction}
    User data: {input_data}

    Give 4 short sleep recommendations.
    """

    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt
)

    text = response.text

    return [t.strip("- ").strip() for t in text.split("\n") if t.strip()]