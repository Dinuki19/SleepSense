from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timedelta
from app.schemas.sleep_schema import SleepInput
from app.services.predict_service import make_prediction
from app.database.db import get_predictions_collection
from app.auth import get_current_user
from bson import ObjectId

router = APIRouter()

# ----------------- Helper: Risk Level Mapping -----------------
def get_risk_level(prediction: str):
    if prediction == "Sleep Apnea":
        return "High"
    elif prediction == "Insomnia":
        return "Moderate"
    elif prediction == "Healthy":
        return "Low"
    return "Unknown"

# ----------------- AI Prediction + Save -----------------
@router.post("/")  # ✅ Changed from "/predict" to "/" so frontend POST /predict works
async def predict(data: SleepInput, user: dict = Depends(get_current_user)):
    try:
        # Make prediction
        prediction_label, input_df = make_prediction(data)
        if not prediction_label:
            raise HTTPException(status_code=500, detail="Prediction returned None")

        risk_level = get_risk_level(prediction_label)

        # Prepare document
        prediction_doc = {
            "user_id": user["sub"],
            "user_name": user.get("name"),
            "input": input_df.to_dict(orient="records")[0],
            "prediction": prediction_label,
            "risk_level": risk_level,
            "timestamp": datetime.utcnow() + timedelta(hours=5, minutes=30)
        }

        # Save to MongoDB
        coll = get_predictions_collection()
        result = await coll.insert_one(prediction_doc)
        prediction_doc["_id"] = str(result.inserted_id)  # Return _id for frontend

        return prediction_doc  # Return full prediction object

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# ----------------- Fetch predictions -----------------
@router.get("/predictions")
async def get_user_predictions(user: dict = Depends(get_current_user), limit: int = 5):
    coll = get_predictions_collection()
    preds_cursor = coll.find({"user_id": user["sub"]}).sort("timestamp", -1).limit(limit)

    predictions = []
    async for pred in preds_cursor:
        pred["_id"] = str(pred["_id"])
        predictions.append(pred)

    return predictions

# ----------------- Delete prediction -----------------
@router.delete("/prediction/{id}")
async def delete_prediction(id: str, user: dict = Depends(get_current_user)):
    coll = get_predictions_collection()
    result = await coll.delete_one({"_id": ObjectId(id), "user_id": user["sub"]})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return {"message": "Prediction deleted successfully"}