from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.db import db
from .routes.auth import auth_bp
from .routes.pokemon import pokemon_bp

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pokedex.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    app.config["JWT_SECRET_KEY"] = "key_trocar_para_producao"
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
    app.config["JWT_COOKIE_SAMESITE"] = "Lax"
    app.config["JWT_COOKIE_SAMESITE"] = "None"
    app.config["JWT_COOKIE_SECURE"] = True
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False


    CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)
    
    db.init_app(app)
    jwt = JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(pokemon_bp, url_prefix="/pokemon")

    @app.route("/")
    def index():
        return jsonify({"ok": True, "msg": "Backend rodando"})
    
    with app.app_context():
        db.create_all()

    return app