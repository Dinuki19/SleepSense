import joblib
import pandas as pd
from datetime import datetime
from app.schemas.sleep_schema import SleepInput  # make sure this path is correct

# Load model once
model_package = joblib.load("app/model/best_sleep_model.pkl")
pipeline = model_package["pipeline"]
label_encoder = model_package["label_encoder"]

def make_prediction(data: SleepInput):
    """
    Make a sleep disorder prediction using the input data.

    Handles optional fields with default values.
    Returns: prediction_label (Sleep Disorder), input DataFrame
    """

    # Set defaults for optional fields
    heart_rate = data.Heart_Rate if getattr(data, "Heart_Rate", None) is not None else 75
    systolic = data.Systolic if getattr(data, "Systolic", None) is not None else 120
    diastolic = data.Diastolic if getattr(data, "Diastolic", None) is not None else 80
    daily_steps = data.Daily_Steps if getattr(data, "Daily_Steps", None) is not None else 5000

    # Prepare input DataFrame exactly as model expects
    input_df = pd.DataFrame([{
        "Gender": data.Gender,
        "Age": data.Age,
        "Occupation": data.Occupation,
        "Sleep Duration (hours)": data.Sleep_Duration,
        "Quality of Sleep (scale: 1-10)": data.Quality_of_Sleep,
        "Physical Activity Level (minutes/day)": data.Physical_Activity_Level,
        "Stress Level (scale: 1-10)": data.Stress_Level,
        "BMI Category": data.BMI_Category,
        "Systolic": systolic,
        "Diastolic": diastolic,
        "Heart Rate (bpm)": heart_rate,
        "Daily Steps": daily_steps
        
    }])

    # Debug: check the input DataFrame
    print("Model Input:\n", input_df)

    # Predict and decode label
    prediction_encoded = pipeline.predict(input_df)[0]
    prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

    return prediction_label, input_df