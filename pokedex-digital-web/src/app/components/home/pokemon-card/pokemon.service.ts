import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class PokemonService{
  private API_URL = 'http://127.0.0.1:5000/pokemon/'

  constructor(private httpClient: HttpClient){}

  public buscarPokemons(){
    return this.httpClient.get(this.API_URL);
  }
}
