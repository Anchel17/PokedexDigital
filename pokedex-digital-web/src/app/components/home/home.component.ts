import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonDTO } from 'src/app/DTO/PokemonDTO';
import { PokemonService } from './pokemon-card/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pokemons: PokemonDTO[] = [];
  filtroAtual: 'todos' | 'favoritos' | 'batalha' = 'todos';
  isLoading = false;

  constructor(private pokemonService: PokemonService){}

  ngOnInit(){
    this.carregarPokemons('todos')
  }

  public onPokemonUpdated(codigo: number) {
    this.pokemons = this.pokemons.filter(p => p.codigo != codigo);
  }

  public carregarPokemons(filtro: 'todos' | 'favoritos' | 'batalha'){
    this.isLoading = true;
    this.filtroAtual = filtro;

    const pokemonsObservable = filtro === 'todos' ? this.pokemonService.buscarPokemons()
    : this.pokemonService.buscarPokemonsComFiltro(filtro);

    pokemonsObservable.subscribe({
      next: (data) => {
        this.pokemons = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
