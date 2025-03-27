import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  //styleUrl: './hero.component.css'
})
export default class HeroComponent {

  esDispositivoMobil: boolean 
  opcionHover: number | null = null

  estiloAniosBisiestos: string
  estiloTheLegendOfZelda: string
  estiloCodigoMorse: string
  estiloBatallaPokemon: string
  private estiloBlur: string = 'grayscale'

  constructor() {
    this.esDispositivoMobil = this.esMovil()

    this.estiloAniosBisiestos = this.esDispositivoMobil ? '' : this.estiloBlur
    this.estiloTheLegendOfZelda = this.esDispositivoMobil ? '' : this.estiloBlur
    this.estiloCodigoMorse = this.esDispositivoMobil ? '' : this.estiloBlur
    this.estiloBatallaPokemon = this.esDispositivoMobil ? '' : this.estiloBlur
    
  }
  esMovil(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  
  onMouseEnter(index: number){
    if( this.esDispositivoMobil) return

   const estiloHover: string = 'scale-125'
   const estiloNoHover: string = 'grayscale blur-sm'

    this.estiloAniosBisiestos = estiloNoHover
    this.estiloTheLegendOfZelda = estiloNoHover
    this.estiloCodigoMorse = estiloNoHover
    this.estiloBatallaPokemon = estiloNoHover
    
    switch(index){
      case 0:
        this.estiloAniosBisiestos = estiloHover
        break
      case 1:
        this.estiloTheLegendOfZelda = estiloHover
        break
      case 2:
        this.estiloCodigoMorse = estiloHover
        break
      case 3:
      this.estiloBatallaPokemon = estiloHover
      break
    }
  }

  resetStyle(){
    if( this.esDispositivoMobil) return
    this.estiloAniosBisiestos = this.estiloBlur
    this.estiloTheLegendOfZelda = this.estiloBlur
    this.estiloCodigoMorse = this.estiloBlur
    this.estiloBatallaPokemon = this.estiloBlur
  }
}
