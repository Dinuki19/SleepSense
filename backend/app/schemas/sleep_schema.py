from pydantic import BaseModel

class SleepInput(BaseModel):
    Gender: str
    Age: float
    Occupation: str
    Sleep_Duration: float
    Quality_of_Sleep: float
    Physical_Activity_Level: float
    Stress_Level: float
    BMI_Category: str