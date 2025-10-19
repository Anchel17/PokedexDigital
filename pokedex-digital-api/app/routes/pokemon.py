from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
from sqlalchemy import or_
from ..db import db
from ..models import Usuario, PokemonUsuario, TipoPokemon
from datetime import datetime

pokemon_bp = Blueprint("pokemon", __name__)
POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/pokemon"
STATS_DESEJADOS = ['hp', 'attack', 'defense']

@pokemon_bp.route("/", methods=['GET'])
@jwt_required()
def listarPokemons():
    userId = get_jwt_identity()
    response = requests.get(f"{POKEAPI_BASE_URL}")

    if response.status_code != 200:
        return jsonify({"error": "Falha ao acessar a PokeAPI"}), 500
    
    data = response.json()
    resultados = []

    pokemonsUsuario = (
        PokemonUsuario.query
        .filter(PokemonUsuario.IDUsuario == userId)
        .filter(or_(PokemonUsuario.Favorito == True, PokemonUsuario.GrupoBatalha == True))
        .all()
        )

    pokemonMap = {}
    for p in pokemonsUsuario:
        pokemonMap[str(p.Codigo)] = {
            "IDPokemonUsuario": p.IDPokemonUsuario,
            "Favorito": bool(p.Favorito),
            "GrupoBatalha": bool(p.GrupoBatalha),
            "IDTipoPokemon": p.IDTipoPokemon
        }

    for item in data['results']:
        nome = item['name']
        detalhes = requests.get(item['url'])

        if detalhes.status_code != 200:
            continue

        detalhes = detalhes.json()

        codigo = detalhes['id']
        imagem_url = detalhes['sprites']['front_default']
        tipos = [t['type']['name'] for t in detalhes['types']]
        
        stats = {
            s['stat']['name']: s['base_stat']
            for s in detalhes['stats']
            if s['stat']['name'] in STATS_DESEJADOS
        }

        chavePokemonNoMapa = str(codigo)
        pokemonInfo = pokemonMap.get(chavePokemonNoMapa)

        resultados.append({
            "codigo": codigo,
            "nome": nome,
            "imagemUrl": imagem_url,
            "tipos": tipos,
            "stats": stats,
            "favorito": pokemonInfo["Favorito"] if pokemonInfo else False,
            "inGrupoDeBatalha": pokemonInfo["GrupoBatalha"] if pokemonInfo else False
        })

    return jsonify(resultados)

@pokemon_bp.route("/favorite", methods=["POST"])
@jwt_required()
def favoritarPokemon():
    userId = get_jwt_identity()
    data = request.get_json() or {}

    if not data:
        return jsonify({"msg": "JSON inválido"}), 400

    codigo = data.get("codigo")
    nome = data.get("nome")
    imagemUrl = data.get("imagemUrl")
    tipoDescricao = data.get("tipos")

    if not all([codigo, nome]):
        return jsonify({"msg": "Codigo e Nome são obrigatórios"}), 400
    
    pokemonJaAdicionado = PokemonUsuario.query.filter_by(IDUsuario=userId, Codigo=str(codigo)).first()

    if pokemonJaAdicionado:
        pokemonJaAdicionado.Favorito = not bool(pokemonJaAdicionado.Favorito)
        db.session.commit()

        if pokemonJaAdicionado.Favorito == True:
            return jsonify({"msg": "Pokémon adicionado aos favoritos", "status": 200}), 200
        
        return jsonify({"msg": "Pokémon removido dos favoritos", "status": 200}), 200

    tipoObj = None
    if tipoDescricao:
        for descricao in tipoDescricao:
            tipoObj = TipoPokemon.query.filter_by(Descricao=descricao).first()

            if not tipoObj:
                tipoObj = TipoPokemon(Descricao=descricao)
                db.session.add(tipoObj)
        
        db.session.flush()

    novoPokemonFavorito = PokemonUsuario(
        IDUsuario=userId,
        IDTipoPokemon=tipoObj.IDTipoPokemon if tipoObj else None,
        Codigo=str(codigo),
        ImagemUrl=imagemUrl,
        Nome=nome,
        GrupoBatalha=False,
        Favorito=True
    )

    db.session.add(novoPokemonFavorito)
    db.session.commit()

    return jsonify({"msg": "Pokemon adicionado aos favoritos"}), 201

@pokemon_bp.route("/filtrar", methods=['GET'])
@jwt_required()
def listarPokemonsComFiltro():
    userId = get_jwt_identity()
    filtro = request.args.get("filter", "todos")

    query = PokemonUsuario.query.filter_by(IDUsuario=userId)

    if filtro == "favoritos":
        query = query.filter_by(Favorito=True)
    elif filtro == "batalha":
        query = query.filter_by(GrupoBatalha=True)

    pokemons_usuario = query.all()
    resultados = []

    for p in pokemons_usuario:
        detalhesResponse = requests.get(f"{POKEAPI_BASE_URL}/{p.Codigo}")
        if detalhesResponse.status_code != 200:
            continue
        

        detalhes = detalhesResponse.json()
        imagem_url = detalhes["sprites"]["front_default"]
        tipos = [t["type"]["name"] for t in detalhes["types"]]
        stats = {
            s["stat"]["name"]: s["base_stat"]
            for s in detalhes["stats"]
            if s["stat"]["name"] in STATS_DESEJADOS
        }

        resultados.append({
            "codigo": p.Codigo,
            "nome": p.Nome,
            "imagemUrl": imagem_url,
            "tipos": tipos,
            "stats": stats,
            "favorito": p.Favorito,
            "grupoBatalha": p.GrupoBatalha,
        })
    return jsonify(resultados), 200