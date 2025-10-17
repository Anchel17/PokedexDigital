import { Component } from '@angular/core';
import { PokemonDTO } from 'src/app/DTO/PokemonDTO';
import { PokemonService } from './pokemon-card/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pokemons: PokemonDTO[] = [];
  isLoading = true;

  constructor(private pokemonService: PokemonService){}

  ngOnInit(){
    this.carregarPokemons();
  }

  private carregarPokemons(){
    this.isLoading = true;

    this.pokemonService.buscarPokemons().subscribe({
      next: (data: any) => {
        this.pokemons = data
        this.isLoading = false
      },
      error: (err) => {
        console.log("Erro ao carregar pokemons", err)
        this.isLoading = false
      }
    })
  }
}
