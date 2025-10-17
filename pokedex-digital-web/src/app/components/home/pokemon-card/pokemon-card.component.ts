import { Component, Input } from '@angular/core';
import { PokemonDTO } from 'src/app/DTO/PokemonDTO';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input()
  public pokemon: PokemonDTO;

  constructor(){}

  ngOnInit(){}
}
