from fastapi import APIRouter, Depends
from datetime import datetime
from app.schemas.sleep_schema import SleepInput
from app.services.predict_service import make_prediction
from app.database.db import get_predictions_collection
from app.auth import get_current_user

router = APIRouter()

@router.post("/predict")
def predict(data: SleepInput, user: dict = Depends(get_current_user)):
    """
    Save user's prediction linked to the logged-in user.
    """
    prediction_label, input_df = make_prediction(data)

    prediction_doc = {
        "user_id": user["sub"],
        "user_name": user.get("name"),
        "input": input_df.to_dict(orient="records")[0],
        "prediction": prediction_label,
        "timestamp": datetime.utcnow()
    }

    coll = get_predictions_collection()
    coll.insert_one(prediction_doc)

    return {
        "prediction": prediction_label,
        "message": "Prediction saved to MongoDB"
    }