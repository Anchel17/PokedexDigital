import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonDTO } from "src/app/DTO/PokemonDTO";

@Injectable()
export class PokemonService{
  private API_URL = 'http://localhost:5000/pokemon/'

  constructor(private httpClient: HttpClient){}

  public buscarPokemons(): Observable<PokemonDTO[]>{
    return this.httpClient.get<PokemonDTO[]>(this.API_URL, {withCredentials: true});
  }

  public buscarPokemonsComFiltro(filtro: 'todos' | 'favoritos' | 'batalha'): Observable<PokemonDTO[]>{
    return this.httpClient.get<PokemonDTO[]>(`${this.API_URL}/filtrar?filter=${filtro}`, {withCredentials: true})
  }

  public favoritarPokemon(pokemon: PokemonDTO){
    return this.httpClient.post(this.API_URL + "favorite", pokemon, {withCredentials: true})
  }
}
