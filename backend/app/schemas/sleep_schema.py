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
    BMI_Category: str
    Heart_Rate: Optional[int] = 75 
    Daily_Steps: Optional[int] = 5000
    Systolic: Optional[int] = 120
    Diastolic: Optional[int] = 80