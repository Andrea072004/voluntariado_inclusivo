from flask import Blueprint, jsonify
from controllers.user_controller import get_all_users
from controllers.user_controller import get_all_users, crear_usuario
from firebase_admin import firestore
db = firestore.client()


user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/", methods=["GET"])
def listar_usuarios():
    usuarios = get_all_users()
    return jsonify(usuarios)

@user_routes.route("/register", methods=["POST"])
def registrar_usuario():
    from flask import request
    data = request.get_json()

    # Validación mínima
    if not data.get("correo") or not data.get("contrasena"):
        return {"message": "Faltan datos requeridos"}, 400

    resultado = crear_usuario(data)
    if resultado.get("success"):
        return {"message": "Usuario registrado correctamente"}, 201
    else:
        return {"message": resultado.get("error", "Error desconocido")}, 500

@user_routes.route("/login", methods=["POST"])
def login_usuario():
    from flask import request
    data = request.get_json()

    correo = data.get("correo", "").lower().strip()
    contrasena = data.get("contrasena", "").strip()

    if not correo or not contrasena:
        return {"message": "Faltan datos"}, 400

    usuarios_ref = db.collection("usuarios").stream()

    for doc in usuarios_ref:
        user = doc.to_dict()
        if user.get("correo", "").lower() == correo and user.get("contrasena") == contrasena:
            return {
                    "message": "Login exitoso",
                    "id": doc.id,
                    "nombre": user.get("nombre", "Usuario")
                    }, 200


    return {"message": "Correo o contraseña incorrectos"}, 401

@user_routes.route("/recuperar", methods=["POST"])
def recuperar_contrasena():
    from flask import request
    data = request.get_json()
    nombre = data.get("nombre", "").lower().strip()
    correo = data.get("correo", "").lower().strip()

    usuarios = db.collection("usuarios").stream()
    for doc in usuarios:
        user = doc.to_dict()
        if user.get("nombre", "").lower() == nombre and user.get("correo", "").lower() == correo:
            return {"success": True, "contrasena": user.get("contrasena")}, 200

    return {"success": False, "message": "Datos no encontrados"}, 404
