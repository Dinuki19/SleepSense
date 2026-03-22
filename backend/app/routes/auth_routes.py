from fastapi import APIRouter, HTTPException, status
from datetime import datetime
from app.models.user import UserCreate, UserLogin
from app.database.db import get_users_collection
from app.auth import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate):
    users_collection = get_users_collection()
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = hash_password(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }
    users_collection.insert_one(new_user)
    return {"message": "User created successfully"}

@router.post("/login")
def login(user: UserLogin):
    users_collection = get_users_collection()
    db_user = users_collection.find_one({"email": user.email})
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