from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# Async client
client = AsyncIOMotorClient(MONGO_URI)
db = client.sleepdb

# Collections
users_collection = db.users
predictions_collection = db.predictions

def get_users_collection():
    return users_collection

def get_predictions_collection():
    return predictions_collection