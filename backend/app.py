from flask import Flask
from flask_cors import CORS
from routes.user_routes import user_routes

app = Flask(__name__)
CORS(app)  # Permitir llamadas desde el frontend

# Registrar las rutas
app.register_blueprint(user_routes, url_prefix="/api/users")

@app.route("/")
def home():
    return {"message": "API de Voluntariado Inclusivo activa"}

if __name__ == "__main__":
    app.run(debug=True)
