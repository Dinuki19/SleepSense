from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.schemas.sleep_schema import SleepInput
from app.services.predict_service import make_prediction
from app.database.db import get_predictions_collection
from app.auth import get_current_user


router = APIRouter()

# ----------------- AI Prediction + Save -----------------
@router.post("/predict")
async def predict(data: SleepInput, user: dict = Depends(get_current_user)):
    """
    Generate AI prediction and save it linked to the logged-in user.
    """
    try:
        # 1️⃣ Get prediction from your service
        prediction_label, input_df = make_prediction(data)

        # 2️⃣ Prepare MongoDB document
        prediction_doc = {
                    "user_id": user["sub"],
                    "user_name": user.get("name"),
                    "input": input_df.to_dict(orient="records")[0],
                    "prediction": prediction_label,
                    "timestamp": datetime.utcnow()
        }

        # 3️⃣ Save to MongoDB
        coll = get_predictions_collection()
        await coll.insert_one(prediction_doc)

        # 4️⃣ Return prediction to frontend
        return {
            "prediction": prediction_label,
            "message": "Prediction saved to MongoDB"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# ----------------- Fetch all predictions for logged-in user -----------------
@router.get("/predictions")
async def get_user_predictions(user: dict = Depends(get_current_user), limit: int = 5):
    """
    Fetch recent predictions for the logged-in user.
    """
    coll = get_predictions_collection()
    preds_cursor = coll.find({"user_id": user["sub"]}).sort("timestamp", -1).limit(limit)

    predictions = []
    async for pred in preds_cursor:
        pred["_id"] = str(pred["_id"])  # Convert ObjectId to string
        predictions.append(pred)

    return predictions