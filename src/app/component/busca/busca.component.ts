import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
 @Output() pesquisaFeita: EventEmitter<string>;
 @Output() limpezaFiltro: EventEmitter<void>;

 public buscaRealizada: boolean;

  constructor() {
    this.pesquisaFeita = new EventEmitter<string>();
    this.limpezaFiltro = new EventEmitter<void>();

    this.buscaRealizada = false;
  }


  public onClick(texto: string): void {
    this.buscaRealizada = true;
    this.pesquisaFeita.emit(texto);
  }

  public onClickLimpar(): void {
    this.buscaRealizada = false;
    this.limpezaFiltro.emit();
  }
}
