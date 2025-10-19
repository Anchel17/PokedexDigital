from flask import Blueprint, request, jsonify
from ..db import db
from ..models import Usuario
from ..utils import hash_password, verify_password
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, get_jwt_identity, jwt_required
from datetime import timedelta

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    nome = data.get("nome")
    login = data.get("login")
    email = data.get("email")
    senha = data.get("senha")

    if not all([nome, login, email, senha]):
        return jsonify({"msg": "Nome, Login, Email e Senha são obrigatórios"}), 400
    
    if Usuario.query.filter((Usuario.Login==login) | (Usuario.Email==email)).first():
        return jsonify({"msg": "Login ou Email já cadastrado"}), 400
    
    user = Usuario(Nome=nome, Login=login, Email=email, Senha=hash_password(senha))

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuario criado", "IDUsuario": user.IDUsuario}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    login = data.get("login")
    senha = data.get("senha")

    if not all([login, senha]):
        return jsonify({"msg": "Login e Senha são obrigatórios"}), 400
    
    user = Usuario.query.filter((Usuario.Login==login) | (Usuario.Email==login)).first()

    if not user or not verify_password(user.Senha, senha):
        return jsonify({"msg": "Credenciais inválidas."}), 401
    
    access_token = create_access_token(identity=str(user.IDUsuario), expires_delta=timedelta(days=1))
    response = jsonify({"msg": "Login efetuado"})
    set_access_cookies(response, access_token)

    return response, 200

@auth_bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logout efetuado"})
    unset_jwt_cookies(response)
    return response, 200

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    currentUserId = get_jwt_identity()
    user = Usuario.query.get(currentUserId)

    if not user:
        return jsonify(404)
    
    return jsonify(200)