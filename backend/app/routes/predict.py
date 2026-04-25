from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timedelta
from app.schemas.sleep_schema import SleepInput
from app.services.predict_service import make_prediction
from app.database.db import get_predictions_collection
from app.auth import get_current_user
from bson import ObjectId

from app.services.llm_service import generate_llm_recommendations
import asyncio  

router = APIRouter()


def get_risk_level(prediction: str):
    if prediction == "Sleep Apnea":
        return "High"
    elif prediction == "Insomnia":
        return "Moderate"
    elif prediction == "Healthy":
        return "Low"
    return "Unknown"


@router.post("/")
async def predict(data: SleepInput, user: dict = Depends(get_current_user)):
    try:

       
        # 1. ML MODEL 
        
        prediction_label, input_df, recommendations = make_prediction(data)

        if prediction_label is None:
            raise HTTPException(status_code=500, detail="Prediction returned None")

        risk_level = get_risk_level(prediction_label)

        # default always ML recommendations
        final_recommendations = recommendations

        
        # 2. LLM 
        
        try:
            llm_recs = await asyncio.to_thread(
                generate_llm_recommendations,
                prediction_label,
                input_df.to_dict(orient="records")[0]
            )

            # only replace if valid
            if isinstance(llm_recs, list) and len(llm_recs) > 0:
                final_recommendations = llm_recs

        except Exception as e:
            print("LLM failed, using rule-based fallback:", e)

        
        # 3. SAVE RESULT 
       
        prediction_doc = {
            "user_id": user["sub"],
            "user_name": user.get("name"),
            "input": input_df.to_dict(orient="records")[0],
            "prediction": prediction_label,
            "risk_level": risk_level,
            "recommendations": final_recommendations,
            "timestamp": datetime.utcnow() + timedelta(hours=5, minutes=30)
        }

        coll = get_predictions_collection()
        result = await coll.insert_one(prediction_doc)
        prediction_doc["_id"] = str(result.inserted_id)

        return prediction_doc

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.get("/predictions")
async def get_user_predictions(user: dict = Depends(get_current_user)):
    coll = get_predictions_collection()
    preds_cursor = coll.find({"user_id": user["sub"]}).sort("timestamp", -1)

    predictions = []
    async for pred in preds_cursor:
        pred["_id"] = str(pred["_id"])
        predictions.append(pred)

    return predictions


@router.delete("/prediction/{id}")
async def delete_prediction(id: str, user: dict = Depends(get_current_user)):
    coll = get_predictions_collection()

    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    result = await coll.delete_one({"_id": obj_id, "user_id": user["sub"]})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return {"message": "Prediction deleted successfully"}


@router.get("/prediction/{id}")
async def get_prediction(id: str, user: dict = Depends(get_current_user)):
    coll = get_predictions_collection()

    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    pred = await coll.find_one({"_id": obj_id, "user_id": user["sub"]})

    if not pred:
        raise HTTPException(status_code=404, detail="Prediction not found")

    pred["_id"] = str(pred["_id"])
    return pred


@router.get("/history")
async def get_prediction_history(user: dict = Depends(get_current_user)):
    coll = get_predictions_collection()

    preds_cursor = coll.find({"user_id": user["sub"]}).sort("timestamp", -1)

    predictions = []
    async for pred in preds_cursor:
        pred["_id"] = str(pred["_id"])
        predictions.append(pred)

    return predictions