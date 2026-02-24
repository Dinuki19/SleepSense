from pymongo import MongoClient
from pymongo.errors import AutoReconnect
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# Persistent global client
client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsAllowInvalidCertificates=False,
    serverSelectionTimeoutMS=5000
)

db = client.sleepdb
predictions_collection = db.predictions


def get_predictions_collection():
    global client, db, predictions_collection
    try:
        client.admin.command("ping")
    except AutoReconnect:
        client = MongoClient(
            MONGO_URI,
            tls=True,
            tlsAllowInvalidCertificates=False
        )
        db = client.sleepdb
        predictions_collection = db.predictions

    return predictions_collection