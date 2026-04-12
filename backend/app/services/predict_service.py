import joblib
import pandas as pd
from app.schemas.sleep_schema import SleepInput
from app.services.bmi_service import calculate_bmi, get_bmi_category
from app.services.bp_service import estimate_blood_pressure
from app.services.heart_rate_service import estimate_heart_rate
from app.services.steps_service import estimate_daily_steps

# Load model once
model_package = joblib.load("app/models/best_sleep_model.pkl")
pipeline = model_package["pipeline"]
label_encoder = model_package["label_encoder"]

def make_prediction(data: SleepInput):

    # ✅ Calculate BMI and category
    bmi_value = calculate_bmi(data.Height, data.Weight)
    bmi_category = get_bmi_category(bmi_value)

    # ✅ Heart rate
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

    # ✅ Daily steps
    if data.Daily_Steps is not None:
        daily_steps = data.Daily_Steps
    else:
        daily_steps = estimate_daily_steps(
            data.Age,
            data.Occupation,
            data.Physical_Activity_Level
        )

    # ✅ FIXED: Column order now exactly matches training data
    # Training order: Gender, Age, Occupation, Sleep Duration, Quality of Sleep,
    # Physical Activity, Stress Level, BMI Category, Heart Rate, Daily Steps, Systolic, Diastolic
    input_df = pd.DataFrame([{
        "Gender": data.Gender,
        "Age": data.Age,
        "Occupation": data.Occupation,
        "Sleep Duration (hours)": data.Sleep_Duration,
        "Quality of Sleep (scale: 1-10)": data.Quality_of_Sleep,
        "Physical Activity Level (minutes/day)": data.Physical_Activity_Level,
        "Stress Level (scale: 1-10)": data.Stress_Level,
        "BMI Category": bmi_category,
        "Heart Rate (bpm)": heart_rate,       # ✅ moved up
        "Daily Steps": daily_steps,            # ✅ moved up
        "Systolic": systolic,                  # ✅ moved down
        "Diastolic": diastolic                 # ✅ moved down
    }])

    # Debug logs
    print("=== PREDICTION DEBUG ===")
    print("BMI:", bmi_value, "| BMI Category:", bmi_category)
    print("Heart Rate:", heart_rate)
    print("Systolic:", systolic, "| Diastolic:", diastolic)
    print("Daily Steps:", daily_steps)
    print("Input columns:", input_df.columns.tolist())
    print("Input values:", input_df.values)
    print("========================")

    # ✅ Predict
    prediction_encoded = pipeline.predict(input_df)[0]
    prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

    print("Raw Encoded:", prediction_encoded)
    print("Prediction Label:", prediction_label)

    # ✅ Map "None" string to "Healthy"
    if prediction_label == "None":
        prediction_label = "Healthy"

    print("Final Label:", prediction_label)

    return prediction_label, input_df