from app.db import db
from datetime import datetime

class Usuario(db.Model):
    __tablename__ = "Usuario"

    IDUsuario = db.Column(db.Integer, primary_key=True)
    Nome = db.Column(db.String(150), nullable=False)
    Login = db.Column(db.String(80), unique=True, nullable=False)
    Email = db.Column(db.String(120), unique=True, nullable=False)
    Senha = db.Column(db.String(255), nullable=False)
    DTInclusao = db.Column(db.DateTime, default=datetime.utcnow)
    DTAlteracao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    pokemons = db.relationship("PokemonUsuario", back_populates="usuario", cascade="all, delete-orphan")

class TipoPokemon(db.Model):
    __tablename__ = "TipoPokemon"

    IDTipoPokemon = db.Column(db.Integer, primary_key=True)
    Descricao = db.Column(db.String(100), nullable=False)

    pokemons = db.relationship("PokemonUsuario", back_populates="tipo")

class PokemonUsuario(db.Model):
    __tablename__ = "PokemonUsuario"
    
    IDPokemonUsuario = db.Column(db.Integer, primary_key=True)
    IDUsuario = db.Column(db.Integer, db.ForeignKey("Usuario.IDUsuario"), nullable=False)
    IDTipoPokemon = db.Column(db.Integer, db.ForeignKey("TipoPokemon.IDTipoPokemon"), nullable=True)
    Codigo = db.Column(db.String(50), nullable=False)
    ImagemUrl = db.Column(db.String(500))
    Nome = db.Column(db.String(150), nullable=False)
    GrupoBatalha = db.Column(db.Boolean, default=False)
    Favorito = db.Column(db.Boolean, default=False)

    usuario = db.relationship("Usuario", back_populates="pokemons")
    tipo = db.relationship("TipoPokemon", back_populates="pokemons")

