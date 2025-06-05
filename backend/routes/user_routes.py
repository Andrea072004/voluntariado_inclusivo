from flask import Blueprint, jsonify
from controllers.user_controller import get_all_users

user_routes = Blueprint("user_routes", __name__)

@user_routes.route("/", methods=["GET"])
def listar_usuarios():
    usuarios = get_all_users()
    return jsonify(usuarios)
