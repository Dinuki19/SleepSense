from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserLogin
from app.auth import hash_password, verify_password, create_access_token

router = APIRouter()

# TEMP database (resets when server restarts)
fake_users_db = {}

# SIGNUP
@router.post("/signup")
def signup(user: UserCreate):
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)

    fake_users_db[user.email] = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }

    return {"message": "User created successfully"}


# LOGIN
@router.post("/login")
def login(user: UserLogin):
    db_user = fake_users_db.get(user.email)

    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }