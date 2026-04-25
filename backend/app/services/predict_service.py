import joblib
import pandas as pd
from app.schemas.sleep_schema import SleepInput
from app.services.bmi_service import calculate_bmi, get_bmi_category
from app.services.bp_service import estimate_blood_pressure
from app.services.heart_rate_service import estimate_heart_rate
from app.services.steps_service import estimate_daily_steps

from app.services.sleep_stress_service import (
    calculate_sleep_quality,
    calculate_stress_level
)

# 🆕 ADD THIS IMPORT
from app.services.recommendation_service import get_recommendations

# Load model once
model_package = joblib.load("app/models/best_sleep_model.pkl")
pipeline = model_package["pipeline"]
label_encoder = model_package["label_encoder"]


def make_prediction(data: SleepInput):

    # ✅ 1. BMI
    bmi_value = calculate_bmi(data.Height, data.Weight)
    bmi_category = get_bmi_category(bmi_value)

    # ✅ 2. Heart Rate
    if data.Heart_Rate is not None:
        heart_rate = data.Heart_Rate
    else:
        stress_for_hr = data.Stress_Level if data.Stress_Level is not None else 5

        heart_rate = estimate_heart_rate(
            data.Age,
            stress_for_hr,
            data.Physical_Activity_Level
        )

    # ✅ 3. Blood Pressure
    if data.Systolic is not None and data.Diastolic is not None:
        systolic = data.Systolic
        diastolic = data.Diastolic
    else:
        stress_for_bp = data.Stress_Level if data.Stress_Level is not None else 5

        systolic, diastolic = estimate_blood_pressure(
            data.Age,
            stress_for_bp,
            bmi_category
        )

    # ✅ 4. Daily Steps
    if data.Daily_Steps is not None:
        daily_steps = data.Daily_Steps
    else:
        daily_steps = estimate_daily_steps(
            data.Age,
            data.Occupation,
            data.Physical_Activity_Level
        )

    
    # 🆕 5. Sleep Quality
    sleep_quality = calculate_sleep_quality(
        data.Sleep_Duration,
        data.Physical_Activity_Level,
        heart_rate,
        daily_steps
    )

    # 🆕 6. Stress Level
    stress_level = calculate_stress_level(
        data.Sleep_Duration,
        heart_rate,
        data.Physical_Activity_Level,
        systolic,
        diastolic
    )



    # ✅ 7. DataFrame
    input_df = pd.DataFrame([{
        "Gender": data.Gender,
        "Age": data.Age,
        "Occupation": data.Occupation,
        "Sleep Duration (hours)": data.Sleep_Duration,
        "Quality of Sleep (scale: 1-10)": sleep_quality,
        "Physical Activity Level (minutes/day)": data.Physical_Activity_Level,
        "Stress Level (scale: 1-10)": stress_level,
        "BMI Category": bmi_category,
        "Heart Rate (bpm)": heart_rate,
        "Daily Steps": daily_steps,
        "Systolic": systolic,
        "Diastolic": diastolic
    }])

    # 🔍 DEBUG
    print("=== PREDICTION DEBUG ===")
    print("BMI:", bmi_value, "| BMI Category:", bmi_category)
    print("Heart Rate:", heart_rate)
    print("Systolic:", systolic, "| Diastolic:", diastolic)
    print("Daily Steps:", daily_steps)
    print("Sleep Quality:", sleep_quality)
    print("Stress Level:", stress_level)
    print("========================")

    # ✅ 8. Predict
    prediction_encoded = pipeline.predict(input_df)[0]
    prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

    # ✅ FIX LABEL
    if prediction_label == "None":
        prediction_label = "Healthy"

    print("Final Label:", prediction_label)

    # 🆕 9. GENERATE RECOMMENDATIONS (NEW ADDITION ONLY)
    recommendations = get_recommendations(prediction_label, input_df)

    # ✅ RETURN UPDATED STRUCTURE (SAFE)
    return prediction_label, input_df, recommendations