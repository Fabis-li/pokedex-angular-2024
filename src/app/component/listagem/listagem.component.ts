import { Component, OnInit } from '@angular/core';
import { coresBackgroundTipo } from '../../models/cores-background-tipo';
import { Pokemon } from '../../models/pokemon';
import { PokeApiService } from '../../services/poke-api.service';
import { converterParaTitleCase } from '../../utils/converter-para-title-case';
import { TipoPokemon } from '../../models/tipo-pokemon';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit {
  public pokemons: Pokemon[];

  public coresBackgroundTipo: coresBackgroundTipo = {    
    Normal: 'fundo-tipo-normal',     
    Fire: 'fundo-tipo-fogo',
    Water: 'fundo-tipo-agua',
    Electric: 'fundo-tipo-eletrico',
    Ice: 'fundo-tipo-gelo',
    Grass: 'fundo-tipo-grama',
    Bug: 'fundo-tipo-inseto',
    Poison: 'fundo-tipo-veneno',
    Flying: 'fundo-tipo-voador',
    Ground: 'fundo-tipo-terra',
    Rock: 'fundo-tipo-pedra',
    Fighting: 'fundo-tipo-lutador',
    Psychic: 'fundo-tipo-psiquico',
    Ghost: 'fundo-tipo-fantasma',
    Dark: 'fundo-tipo-sombrio',
    Fairy: 'fundo-tipo-fada',
    Steel: 'fundo-tipo-aco',      
  }

  constructor(private pokeApiService: PokeApiService){
    this.pokemons = [];
  }

  ngOnInit(): void {
    this.pokeApiService.selecionarTodos().subscribe((res) => {
      const arrayResultados = res.results as any [];

      for(let resultado of arrayResultados) {
        this.pokeApiService.selecionarDetalhesPorUrl(resultado.url).subscribe((objDetalhes: any) => {
          const pokemon = this.mapearPokemon(objDetalhes);

          this.pokemons.push(pokemon);
        });
      }
      
      this.pokemons =  arrayResultados.map(this.mapearPokemon);
    });
  }  

  private mapearPokemon(obj: any): Pokemon {
    return {
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.other.dream_world.front_default,
      tipos: obj.types.map(this.mapearTipoPokemon),
    };
  }

  private mapearTipoPokemon(obj: any): TipoPokemon {
    return { nome: converterParaTitleCase(obj.type.name) }
  }
}
