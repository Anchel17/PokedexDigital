from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from app.db import db
from .routes.auth import auth_bp

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pokedex.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "key_trocar_para_producao"

    db.init_app(app)
    jwt = JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")

    @app.route("/")
    def index():
        return jsonify({"ok": True, "msg": "Backend rodando"})
    
    with app.app_context():
        db.create_all()

    return app