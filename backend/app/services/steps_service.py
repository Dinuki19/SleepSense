def estimate_daily_steps(age: int, occupation: str, physical_activity: int):
    """
    Estimate daily steps based on user features
    """

    # Base steps
    steps = 5000

    # Physical activity effect
    steps += physical_activity * 50

    # Occupation effect 
    if occupation.lower() in ["student", "teacher"]:
        steps += 1000
    elif occupation.lower() in ["engineer", "developer"]:
        steps -= 500

    # Age effect
    if age > 50:
        steps -= 1000

    return max(2000, steps)  