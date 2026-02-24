from fastapi import APIRouter
from datetime import datetime

from ..schemas.sleep_schema import SleepInput
from ..services.predict_service import make_prediction
from ..database.db import get_predictions_collection

router = APIRouter()

@router.post("/predict")
def predict(data: SleepInput):
    prediction_label, input_df = make_prediction(data)

    prediction_doc = {
        "input": input_df.to_dict(orient="records")[0],
        "prediction": prediction_label,
        "timestamp": datetime.now()
    }

    coll = get_predictions_collection()
    coll.insert_one(prediction_doc)

    return {
        "prediction": prediction_label,
        "message": "Prediction saved to MongoDB"
    }

