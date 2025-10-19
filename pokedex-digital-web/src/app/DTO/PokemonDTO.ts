export class PokemonDTO{
  codigo: number;
  imagemUrl: string;
  nome: string;
  stats: {
      attack: number,
      defense: number,
      hp: number
  };
  tipos: string[];
  favorito: boolean;
  inGrupoDeBatalha: boolean;
}
