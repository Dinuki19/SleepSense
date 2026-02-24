import joblib
import pandas as pd
from datetime import datetime

# Load model once
model_package = joblib.load("app/model/best_sleep_model.pkl")
pipeline = model_package["pipeline"]
label_encoder = model_package["label_encoder"]


def make_prediction(data):
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

    prediction_encoded = pipeline.predict(input_df)[0]
    prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

    return prediction_label, input_df