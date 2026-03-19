from pydantic import BaseModel
from typing import Optional

class SleepInput(BaseModel):
    Gender: str
    Age: int
    Occupation: str
    Sleep_Duration: float
    Quality_of_Sleep: float
    Physical_Activity_Level: int
    Stress_Level: int

    Height: float   # NEW
    Weight: float   # NEW

    # Optional features (for later)
    Heart_Rate: Optional[int] = None
    Daily_Steps: Optional[int] = None
    Systolic: Optional[int] = None
    Diastolic: Optional[int] = None