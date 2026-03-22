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

# Database
db = client.sleepdb

# Collections
users_collection = db.users
predictions_collection = db.predictions


def reconnect():
    global client, db, users_collection, predictions_collection

    client = MongoClient(
        MONGO_URI,
        tls=True,
        tlsAllowInvalidCertificates=False,
        serverSelectionTimeoutMS=5000
    )

    db = client.sleepdb
    users_collection = db.users
    predictions_collection = db.predictions


# Get Users Collection
def get_users_collection():
    global client
    try:
        client.admin.command("ping")
    except AutoReconnect:
        reconnect()

    return users_collection


# Get Predictions Collection
def get_predictions_collection():
    global client
    try:
        client.admin.command("ping")
    except AutoReconnect:
        reconnect()

    return predictions_collection