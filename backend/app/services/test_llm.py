from app.services.llm_service import generate_llm_recommendations

result = generate_llm_recommendations(
    "Healthy",
    {"stress": "low", "sleep": "7 hours"}
)

print(result)