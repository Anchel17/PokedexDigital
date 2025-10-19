import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { PokemonDTO } from 'src/app/DTO/PokemonDTO';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input()
  public pokemon: PokemonDTO;

  @Output()
  pokemonUpdated = new EventEmitter<number>();

  constructor(private pokemonService: PokemonService){}

  ngOnInit(){}

  favoritarPokemon(){
    this.pokemonService.favoritarPokemon(this.pokemon).subscribe((response) => {});
    this.pokemon.favorito = !this.pokemon.favorito;

    if(!this.pokemon.favorito){
      this.pokemonUpdated.emit(this.pokemon.codigo);
    }
  }
}
