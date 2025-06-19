from flask import Blueprint, jsonify
from controllers.user_controller import get_all_users
from controllers.user_controller import get_all_users, crear_usuario


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
