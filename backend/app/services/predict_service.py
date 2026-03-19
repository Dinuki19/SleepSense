import joblib
import pandas as pd
from app.schemas.sleep_schema import SleepInput
from app.services.bmi_service import calculate_bmi, get_bmi_category
from app.services.bp_service import estimate_blood_pressure
from app.services.heart_rate_service import estimate_heart_rate
from app.services.steps_service import estimate_daily_steps

# Load model once
model_package = joblib.load("app/model/best_sleep_model.pkl")
pipeline = model_package["pipeline"]
label_encoder = model_package["label_encoder"]

def make_prediction(data: SleepInput):
    """
    Make a sleep disorder prediction using the input data.
    """

    # ✅ Calculate BMI and category
    bmi_value = calculate_bmi(data.Height, data.Weight)
    bmi_category = get_bmi_category(bmi_value)

    # ✅ Heart rate (FIXED)
    if data.Heart_Rate is not None:
        heart_rate = data.Heart_Rate
    else:
        heart_rate = estimate_heart_rate(
            data.Age,
            data.Stress_Level,
            data.Physical_Activity_Level
        )

    # ✅ Blood pressure
    if data.Systolic is not None and data.Diastolic is not None:
        systolic = data.Systolic
        diastolic = data.Diastolic
    else:
        systolic, diastolic = estimate_blood_pressure(
            data.Age,
            data.Stress_Level,
            bmi_category
        )

    # ✅ Daily steps (FIXED)
    if data.Daily_Steps is not None:
        daily_steps = data.Daily_Steps
    else:
        daily_steps = estimate_daily_steps(
            data.Age,
            data.Occupation,
            data.Physical_Activity_Level
        )

    # ✅ Prepare input DataFrame
    input_df = pd.DataFrame([{
        "Gender": data.Gender,
        "Age": data.Age,
        "Occupation": data.Occupation,
        "Sleep Duration (hours)": data.Sleep_Duration,
        "Quality of Sleep (scale: 1-10)": data.Quality_of_Sleep,
        "Physical Activity Level (minutes/day)": data.Physical_Activity_Level,
        "Stress Level (scale: 1-10)": data.Stress_Level,
        "BMI Category": bmi_category,
        "Systolic": systolic,
        "Diastolic": diastolic,
        "Heart Rate (bpm)": heart_rate,
        "Daily Steps": daily_steps
    }])

    # Debug
    print("BMI:", bmi_value)
    print("BMI Category:", bmi_category)
    print("Heart Rate:", heart_rate)
    print("Systolic:", systolic, "Diastolic:", diastolic)
    print("Daily Steps:", daily_steps)
    print("Model Input:\n", input_df)

    # ✅ Predict
    prediction_encoded = pipeline.predict(input_df)[0]
    prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

    return prediction_label, input_df