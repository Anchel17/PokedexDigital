import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonDTO } from 'src/app/DTO/PokemonDTO';
import { PokemonService } from './pokemon-card/pokemon.service';
import { PokemonUpdate } from 'src/app/DTO/PokemonUpdate';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  pokemons: PokemonDTO[] = [];
  filtroAtual: 'todos' | 'favoritos' | 'batalha' = 'todos';
  isLoading = false;

  constructor(private pokemonService: PokemonService, private loginService: LoginService, private router: Router){}

  ngOnInit(){
    this.carregarPokemons('todos')
  }

  public onPokemonUpdated(pokemonUpdate: PokemonUpdate) {
    if( this.filtroAtual != 'todos' && pokemonUpdate.filtro === this.filtroAtual){
      this.pokemons = this.pokemons.filter(p => p.codigo != pokemonUpdate.codigo);

      return;
    }
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

  public logout(){
    this.loginService.deslogar().subscribe((response) => {
      this.router.navigate(['/login']);
    });
  }

  public getMessageSemPokemons(){
    return this.filtroAtual === 'favoritos' ? "Sem pokémons favoritos" : "Sem pokémons no grupo de batalha";
  }

  public getQtdTipos(){
    const tipos = new Set(this.pokemons.flatMap(p => p.tipos));

    return tipos.size;
  }
}
