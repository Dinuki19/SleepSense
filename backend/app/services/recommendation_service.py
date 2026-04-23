def get_recommendations(prediction: str, data=None):

    if prediction == "Insomnia":
        return [
            "Maintain a consistent sleep schedule",
            "Avoid screens before bedtime",
            "Practice relaxation techniques like meditation",
            "Reduce caffeine intake in the evening"
        ]

    elif prediction == "Sleep Apnea":
        return [
            "Consult a doctor for proper diagnosis",
            "Maintain a healthy body weight",
            "Avoid alcohol before sleep",
            "Sleep on your side instead of your back"
        ]

    elif prediction == "Healthy":
        return [
            "Keep maintaining your healthy sleep habits",
            "Continue regular physical activity",
            "Maintain consistent sleep timing"
        ]

    else:
        return [
            "Maintain general healthy lifestyle habits",
            "Monitor your sleep regularly"
        ]