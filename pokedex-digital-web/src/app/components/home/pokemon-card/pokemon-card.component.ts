import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { PokemonDTO } from 'src/app/DTO/PokemonDTO';
import { PokemonService } from './pokemon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonUpdate } from 'src/app/DTO/PokemonUpdate';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input()
  public pokemon: PokemonDTO;

  @Output()
  pokemonUpdated = new EventEmitter<PokemonUpdate>();

  constructor(private pokemonService: PokemonService, private snackBar: MatSnackBar){}

  ngOnInit(){}

  favoritarPokemon(){
    this.pokemonService.favoritarPokemon(this.pokemon).subscribe({
      next: (response: any) => {
        this.snackBar.open(response.msg, '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        this.pokemon.favorito = !this.pokemon.favorito;
        if(!this.pokemon.favorito){
          this.pokemonUpdated.emit({codigo: this.pokemon.codigo, filtro: 'favoritos'});
        }
      },
      error: (err) => {
        this.snackBar.open(err.error.msg || 'Erro ao atualizar grupo de batalha', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    })
  }

  pokemonBattle(){
    this.pokemonService.addOrRemovePokemonBatalha(this.pokemon).subscribe({
      next: (response: any) => {
        this.snackBar.open(response.msg, '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        })
        this.pokemon.inGrupoDeBatalha = !this.pokemon.inGrupoDeBatalha;

        if(!this.pokemon.inGrupoDeBatalha){
          this.pokemonUpdated.emit({codigo: this.pokemon.codigo, filtro: 'batalha'});
        }
      },
      error: (err) => {
        this.snackBar.open(err.error.msg || 'Erro ao atualizar grupo de batalha', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
