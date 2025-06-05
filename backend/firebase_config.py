import firebase_admin
from firebase_admin import credentials, firestore

# ✅ Esta condición evita el error
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_config.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
