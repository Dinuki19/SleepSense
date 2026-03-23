# app/routes/auth_routes.py
from fastapi import APIRouter, HTTPException, status
from datetime import datetime
from app.models.user import UserCreate, UserLogin
from app.database.db import get_users_collection
from app.auth import hash_password, verify_password, create_access_token

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
        "created_at": datetime.utcnow()
    }

    await users_collection.insert_one(new_user)

    return {"message": "User created successfully"}

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
        "name": db_user["name"]
    }
    token = create_access_token(token_data)
    return {"access_token": token, "token_type": "bearer"}