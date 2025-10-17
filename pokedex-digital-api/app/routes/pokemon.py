from flask import Blueprint, request, jsonify
import requests

pokemon_bp = Blueprint("pokemon", __name__)
POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/pokemon"
STATS_DESEJADOS = ['hp', 'attack', 'defense']

@pokemon_bp.route("/", methods=['GET'])
def listarPokemons():
    response = requests.get(f"{POKEAPI_BASE_URL}")

    if response.status_code != 200:
        return jsonify({"error": "Falha ao acessar a PokeAPI"}), 500
    
    data = response.json()
    resultados = []

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

        resultados.append({
            "codigo": codigo,
            "nome": nome,
            "imagemUrl": imagem_url,
            "tipos": tipos,
            "stats": stats
        })

    return jsonify(resultados)