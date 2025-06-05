from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_routes

import firebase_admin
from firebase_admin import credentials, firestore

# ✅ Verifica si la app de Firebase ya está inicializada
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_config.json")
    firebase_admin.initialize_app(cred)

# Conexión a Firestore
db = firestore.client()

app = Flask(__name__)
CORS(app)  # Permitir llamadas desde el frontend

# Registrar las rutas
app.register_blueprint(user_routes, url_prefix="/api/users")

@app.route("/")
def home():
    return {"message": "API de Voluntariado Inclusivo activa"}

if __name__ == "__main__":
    app.run(debug=True)
