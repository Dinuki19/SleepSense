from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router
from app.routes.auth_routes import router as auth_router
from app.routes.admin_routes import router as admin_router

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

# Auth routes
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Predict routes
app.include_router(predict_router, prefix="/predict", tags=["predict"])

# Admin routes
app.include_router(admin_router)