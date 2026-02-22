from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from pymongo import MongoClient
from pymongo.errors import AutoReconnect
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI(title="SleepSense Prediction API")

# ----------------------------
# Load ML model
# ----------------------------
model_package = joblib.load("app/model/best_sleep_model.pkl")
pipeline = model_package["pipeline"]
label_encoder = model_package["label_encoder"]


# Persistent global client, db, collection
client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsAllowInvalidCertificates=False,
    serverSelectionTimeoutMS=5000
)
db = client.sleepdb
predictions_collection = db.predictions

# ----------------------------
# Helper function to ensure connection
# ----------------------------
def get_predictions_collection():
    global client, db, predictions_collection
    try:
        # Ping MongoDB to check connection
        client.admin.command("ping")
    except AutoReconnect:
        # Reconnect if ping fails
        client = MongoClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=False)
        db = client.sleepdb
        predictions_collection = db.predictions
    return predictions_collection

# ----------------------------
# Input Data Model
# ----------------------------
class SleepInput(BaseModel):
    Gender: str
    Age: float
    Occupation: str
    Sleep_Duration: float
    Quality_of_Sleep: float
    Physical_Activity_Level: float
    Stress_Level: float
    BMI_Category: str

# ----------------------------
# Root Endpoint
# ----------------------------
@app.get("/")
def read_root():
    return {"message": "SleepSense backend is running!"}

# ----------------------------
# Prediction Endpoint
# ----------------------------
@app.post("/predict")
def predict(data: SleepInput):
    # Convert input to DataFrame (column names must match training dataset)
    input_df = pd.DataFrame([{
        "Gender": data.Gender,
        "Age": data.Age,
        "Occupation": data.Occupation,
        "Sleep Duration (hours)": data.Sleep_Duration,
        "Quality of Sleep (scale: 1-10)": data.Quality_of_Sleep,
        "Physical Activity Level (minutes/day)": data.Physical_Activity_Level,
        "Stress Level (scale: 1-10)": data.Stress_Level,
        "BMI Category": data.BMI_Category
    }])
    
    # Make prediction
    prediction_encoded = pipeline.predict(input_df)[0]
    prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

    # Prepare document to save
    prediction_doc = {
        "input": input_df.to_dict(orient="records")[0],
        "prediction": prediction_label,
        "timestamp": datetime.now()
    }

    # Save to MongoDB safely
    coll = get_predictions_collection()
    coll.insert_one(prediction_doc)

    return {
        "prediction": prediction_label,
        "message": "Prediction saved to MongoDB"
    }