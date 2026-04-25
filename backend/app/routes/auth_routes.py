# app/routes/auth_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from app.models.user import UserCreate, UserLogin
from app.database.db import get_users_collection
from app.auth import hash_password, verify_password, create_access_token
from bson import ObjectId
from app.auth import get_current_user
from app.database.db import get_predictions_collection


router = APIRouter()

# ----------------- SIGNUP -----------------
@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate):
    users_collection = get_users_collection()

    # check if user exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": "user",   
        "created_at": datetime.utcnow()
    }

    await users_collection.insert_one(new_user)

    return {
        "message": "User created successfully",
        "username": user.name
    }


# ----------------- LOGIN -----------------
@router.post("/login")
async def login(user: UserLogin):
    users_collection = get_users_collection()
    db_user = await users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token_data = {
        "sub": str(db_user["_id"]),
        "email": db_user["email"],
        "name": db_user["name"],
        "role": db_user.get("role", "user")   
    }

    token = create_access_token(token_data)

    return {
        "token": token,
        "token_type": "bearer",
        "username": db_user["name"],
        "role": db_user.get("role", "user")   
    }


# ----------------- GET USER PROFILE -----------------
@router.get("/me")
async def get_profile(user: dict = Depends(get_current_user)):
    users_collection = get_users_collection()

    db_user = await users_collection.find_one(
        {"_id": ObjectId(user["sub"])}
    )

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "name": db_user["name"],
        "email": db_user["email"],
        "role": db_user.get("role", "user"),   
        "created_at": db_user["created_at"]
    }


# ----------------- RESET PASSWORD -----------------
@router.put("/reset-password")
async def reset_password(data: dict):
    users_collection = get_users_collection()

    user = await users_collection.find_one({"email": data["email"]})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    hashed_password = hash_password(data["newPassword"])

    await users_collection.update_one(
        {"email": data["email"]},
        {"$set": {"password": hashed_password}}
    )

    return {"message": "Password reset successfully"}


# ----------------- DELETE ACCOUNT -----------------
@router.delete("/delete-account")
async def delete_account(user: dict = Depends(get_current_user)):
    users_collection = get_users_collection()
    predictions_collection = get_predictions_collection()

    user_id = user["sub"]

    # delete related predictions
    await predictions_collection.delete_many({
        "user_id": user_id
    })

    # delete user
    result = await users_collection.delete_one({
        "_id": ObjectId(user_id)
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Account and related predictions deleted successfully"}