def estimate_blood_pressure(age: int, stress_level: int, bmi_category: str):
    """
    Estimate systolic and diastolic blood pressure based on user features
    """

    # Base normal values
    systolic = 110
    diastolic = 70

    # Age effect
    if age > 40:
        systolic += 10
        diastolic += 5
    elif age > 60:
        systolic += 20
        diastolic += 10

    # Stress effect
    if stress_level >= 7:
        systolic += 10
        diastolic += 5
    elif stress_level >= 4:
        systolic += 5
        diastolic += 2

    # BMI effect
    if bmi_category == "Overweight":
        systolic += 5
        diastolic += 3
    elif bmi_category == "Obese":
        systolic += 10
        diastolic += 5

    return systolic, diastolic