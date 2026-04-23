from pydantic import BaseModel
from typing import Optional


class SleepInput(BaseModel):
    Gender: str
    Age: int
    Occupation: str
    Sleep_Duration: float
    Physical_Activity_Level: int
    Height: float
    Weight: float

    Quality_of_Sleep: Optional[float] = None
    Stress_Level: Optional[int] = None

    # Optional features
    Heart_Rate: Optional[int] = None
    Daily_Steps: Optional[int] = None
    Systolic: Optional[int] = None
    Diastolic: Optional[int] = None

    