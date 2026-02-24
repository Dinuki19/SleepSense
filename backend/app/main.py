from fastapi import FastAPI
from .routes.predict import router as predict_router

app = FastAPI(title="SleepSense Prediction API")

@app.get("/")
def read_root():
    return {"message": "SleepSense backend is running!"}

app.include_router(predict_router)