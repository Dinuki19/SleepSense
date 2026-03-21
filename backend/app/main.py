from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.predict import router as predict_router
from app.routes.auth import router as auth_router


app = FastAPI(title="SleepSense Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "SleepSense backend is running!"}

app.include_router(predict_router)
app.include_router(auth_router)