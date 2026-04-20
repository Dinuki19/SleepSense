from fastapi import APIRouter, Depends, HTTPException
from app.auth import get_current_admin
from app.database.db import get_users_collection, get_predictions_collection
from bson import ObjectId

router = APIRouter(prefix="/admin", tags=["Admin"])


# ----------------- GET ALL USERS -----------------
@router.get("/users")
async def get_all_users(admin: dict = Depends(get_current_admin)):
    users_collection = get_users_collection()

    users_cursor = users_collection.find({}, {"password": 0})

    users = []
    async for user in users_cursor:
        user["_id"] = str(user["_id"])
        users.append(user)

    return users


# ----------------- DELETE USER -----------------
@router.delete("/users/{user_id}")
async def delete_user(user_id: str, admin: dict = Depends(get_current_admin)):
    users_collection = get_users_collection()

    try:
        obj_id = ObjectId(user_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid user ID")

    result = await users_collection.delete_one({"_id": obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}


# ----------------- GET ALL PREDICTIONS -----------------
@router.get("/predictions")
async def get_all_predictions(admin: dict = Depends(get_current_admin)):
    predictions_collection = get_predictions_collection()

    cursor = predictions_collection.find().sort("timestamp", -1)

    predictions = []
    async for pred in cursor:
        pred["_id"] = str(pred["_id"])
        predictions.append(pred)

    return predictions


# ----------------- DASHBOARD STATS (UPDATED FOR CHARTS) -----------------
@router.get("/stats")
async def get_dashboard_stats(admin: dict = Depends(get_current_admin)):
    users_collection = get_users_collection()
    predictions_collection = get_predictions_collection()

    # ----------------- BASIC COUNTS -----------------
    total_users = await users_collection.count_documents({})
    total_predictions = await predictions_collection.count_documents({})

    # ----------------- PREDICTION DISTRIBUTION -----------------
    prediction_pipeline = [
        {
            "$group": {
                "_id": "$prediction",
                "count": {"$sum": 1}
            }
        }
    ]

    prediction_stats = []
    async for item in predictions_collection.aggregate(prediction_pipeline):
        prediction_stats.append({
            "label": item["_id"],
            "count": item["count"]
        })

    # ----------------- RISK LEVEL DISTRIBUTION -----------------
    risk_pipeline = [
        {
            "$group": {
                "_id": "$risk_level",
                "count": {"$sum": 1}
            }
        }
    ]

    risk_stats = []
    async for item in predictions_collection.aggregate(risk_pipeline):
        risk_stats.append({
            "label": item["_id"],
            "count": item["count"]
        })

    # ----------------- PREDICTIONS OVER TIME -----------------
    time_pipeline = [
        {
            "$group": {
                "_id": {
                    "$dateToString": {
                        "format": "%Y-%m-%d",
                        "date": "$timestamp"
                    }
                },
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}}
    ]

    time_stats = []
    async for item in predictions_collection.aggregate(time_pipeline):
        time_stats.append({
            "date": item["_id"],
            "count": item["count"]
        })

    # ----------------- FINAL RESPONSE -----------------
    return {
        "total_users": total_users,
        "total_predictions": total_predictions,

        # chart data
        "prediction_stats": prediction_stats,
        "risk_stats": risk_stats,
        "predictions_over_time": time_stats
    }