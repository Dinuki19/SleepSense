def estimate_heart_rate(age: int, stress_level: int, physical_activity: int):
    """
    Estimate heart rate based on user features
    """

    # Base resting heart rate
    heart_rate = 70

    # Age effect
    if age > 40:
        heart_rate += 3
    elif age > 60:
        heart_rate += 5

    # Stress effect
    if stress_level >= 7:
        heart_rate += 10
    elif stress_level >= 4:
        heart_rate += 5

    # Physical activity effect (more activity = lower resting HR)
    if physical_activity > 60:
        heart_rate -= 5
    elif physical_activity < 20:
        heart_rate += 5

    return heart_rate