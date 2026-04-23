# Sleep Quality Function
def calculate_sleep_quality(sleep_duration, physical_activity, heart_rate, steps):
    
    score = 0

    # Sleep duration
    if 7 <= sleep_duration <= 9:
        score += 4
    elif 6 <= sleep_duration < 7:
        score += 3
    else:
        score += 1

    # Physical activity
    if physical_activity > 60:
        score += 3
    elif physical_activity > 30:
        score += 2
    else:
        score += 1

    # Heart rate (optional influence)
    if heart_rate < 70:
        score += 2
    else:
        score += 1

    # Steps
    if steps > 8000:
        score += 1
    else:
        score += 0

    return min(max(round(score), 1), 10)

# Stress Level Function
def calculate_stress_level(sleep_duration, heart_rate, physical_activity, systolic, diastolic):

    stress = 0

    # Sleep effect
    if sleep_duration < 5:
        stress += 4
    elif sleep_duration < 7:
        stress += 2
    else:
        stress += 1

    # Heart rate
    if heart_rate > 90:
        stress += 3
    elif heart_rate > 75:
        stress += 2

    # Physical activity
    if physical_activity < 30:
        stress += 3
    else:
        stress += 1

    # Blood pressure
    if systolic > 140 or diastolic > 90:
        stress += 3
    elif systolic > 120:
        stress += 1

    return min(max(round(stress), 1), 10)