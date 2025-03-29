import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { determinarEfectividad, obtenerEfectividad } from './core/calcularDanio';

export enum tipo {
  electricidad = 'electricidad',
  fuego = 'fuego',
  agua = 'agua',
  planta = 'planta'
}

enum tipoEstilo {
  electricidad =  'text-yellow-500   border-yellow-500',
  fuego =         'text-red-500     border border-red-500',
  agua =          'text-sky-500     border border-sky-500',
  planta =        'text-green-500   border border-green-500'
}

export interface Pokemon {
  nombre: string,
  tipo: tipo,
  pv: number,
  atk: number,
  def: number,
  img: string,
  estilo: tipoEstilo,
  estiloBatalla: string,
  orientacion: number
}

export interface Comentario {
  texto: string,
  diseno: string
}

@Component({
  selector: 'app-batalla-pokemon',
  imports: [ CommonModule ,ReactiveFormsModule, CdkDropListGroup, CdkDropList, CdkDrag ],
  templateUrl: './batalla-pokemon.component.html',
  //styleUrl: './batalla-pokemon.component.css'
})

export default class BatallaPokemonComponent {

  
  codigo: string = `
  import { Pokemon, tipo } from '../batalla-pokemon.component';

  export const efectividad: any = {
    electricidad: {
      electricidad: 0.5,
      fuego: 1,
      planta: 0.5,
      agua: 2,
    },
    fuego: {
      electricidad: 1,
      fuego: 1,
      planta: 2,
      agua: 0.5,
    },
    agua: {
      electricidad: 1,
      fuego: 2,
      planta: 0.5,
      agua: 1,
    },
    planta: {
      electricidad: 1,
      fuego: 0.5,
      planta: 1,
      agua: 2,
    },
  };

  export function obtenerEfectividad(atacante: string, defensor: string): string {
    const efectividadAtaque = efectividad[atacante][defensor];
    if (efectividadAtaque === 0.5) {
      return 'poco efectivo';
    } else if (efectividadAtaque === 1) {
      return 'normal';
    } else if (efectividadAtaque === 2) {
      return 'muy efectivo';
    } else {
      return 'Efectividad desconocida';
    }
  }

  function calcularDanio(
    ataqueAtacante: number,
    defensaDefensor: number,
    efectividad: number
  ): number {
    return 50 * (ataqueAtacante / defensaDefensor) * efectividad;
  }

  export function determinarEfectividad( pokemonAtacante: Pokemon, pokemonRival: Pokemon): number {
    switch (pokemonAtacante.tipo) {
      case tipo.electricidad:
        const efectividadRival = efectividad.electricidad[pokemonRival.tipo];
        const danio = calcularDanio(
          pokemonAtacante.atk,
          pokemonRival.def,
          efectividadRival
        );
        return danio
        break;

      case tipo.fuego:
        const efectividadFuego = efectividad.fuego[pokemonRival.tipo];
        const danioFuego = calcularDanio(
          pokemonAtacante.atk,
          pokemonRival.def,
          efectividadFuego
        );
        return danioFuego;
        break;

      case tipo.planta:
        const efectividadPlanta = efectividad.planta[pokemonRival.tipo];
        const danioPlanta = calcularDanio(
          pokemonAtacante.atk,
          pokemonRival.def,
          efectividadPlanta
        );
        return danioPlanta;
        break;

      case tipo.agua:
        const efectividadAgua = efectividad.agua[pokemonRival.tipo];
        const danioAgua = calcularDanio(
          pokemonAtacante.atk,
          pokemonRival.def,
          efectividadAgua
        );
        return danioAgua;
        break;
    }
  }`;

  pokemones: Pokemon[] = [
    {
      nombre: 'Charmander',
      tipo: tipo.fuego,
      pv: 200,
      atk: 24,
      def: 18,
      img: 'pokemon/charmander.png',
      estilo: tipoEstilo.fuego,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
    {
      nombre: 'Bulbasaur',
      tipo: tipo.planta,
      pv: 200,
      atk: 18,
      def: 18,
      img: 'pokemon/bulbasaur.png',
      estilo: tipoEstilo.planta,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
    {
      nombre: 'Squirtle',
      tipo: tipo.agua,
      pv: 200,
      atk: 18,
      def: 24,
      img: 'pokemon/squirtle.png',
      estilo: tipoEstilo.agua,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
    {
      nombre: 'Elekid',
      tipo: tipo.electricidad,
      pv: 200,
      atk: 24,
      def: 18,
      img: 'pokemon/elekid.png',
      estilo: tipoEstilo.electricidad,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
    {
      nombre: 'Cyndaquil',
      tipo: tipo.fuego,
      pv: 200,
      atk: 24,
      def: 18,
      img: 'pokemon/cyndaquil.png',
      estilo: tipoEstilo.fuego,
      estiloBatalla: 'bg-green-500',
      orientacion: 1
    },
    {
      nombre: 'Chikorita',
      tipo: tipo.planta,
      pv: 200,
      atk: 18,
      def: 24,
      img: 'pokemon/chikorita.png',
      estilo: tipoEstilo.planta,
      estiloBatalla: 'bg-green-500',
      orientacion: 1
    },
    {
      nombre: 'Totodile',
      tipo: tipo.agua,
      pv: 200,
      atk: 24,
      def: 24,
      img: 'pokemon/totodile.png',
      estilo: tipoEstilo.agua,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
    {
      nombre: 'Mareep',
      tipo: tipo.electricidad,
      pv: 200,
      atk: 18,
      def: 18,
      img: 'pokemon/mareep.png',
      estilo: tipoEstilo.electricidad,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
    {
      nombre: 'Ponyta',
      tipo: tipo.fuego,
      pv: 200,
      atk: 30,
      def: 24,
      img: 'pokemon/ponyta.png',
      estilo: tipoEstilo.fuego,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
    {
      nombre: 'Sunkern',
      tipo: tipo.planta,
      pv: 200,
      atk: 12,
      def: 12,
      img: 'pokemon/sunkern.png',
      estilo: tipoEstilo.planta,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
    {
      nombre: 'Gyarados',
      tipo: tipo.agua,
      pv: 200,
      atk: 48,
      def: 30,
      img: 'pokemon/gyarados.png',
      estilo: tipoEstilo.agua,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
  ]
  
  campoDeBatalla: Pokemon[] = [
    {
      nombre: 'Pikachu',
      tipo: tipo.electricidad,
      pv: 200,
      atk: 24,
      def: 18,
      img: 'pokemon/pikachu.png',
      estilo: tipoEstilo.electricidad,
      estiloBatalla: 'bg-green-500',
      orientacion: 0
    },
  ]


  drop(event: CdkDragDrop<any>) {
    //Si se esta arrastrando elementos en el mismo elemento no hacer nada
    if (event.previousContainer === event.container) {
      return;
    }

    // Si el contenedor de destino es "campoDeBatalla" y ya tiene 2 elementos, no permitir la transferencia
    if (event.container.id === 'campoDeBatalla' && event.container.data.length >= 2) {
      const primerElemento = event.container.data.shift(); // Elimina el primer elemento
      this.pokemones.push(primerElemento);
    }

    // Verificar si estamos moviendo de campoDeBatalla a pokemones
    if (event.previousContainer.id === 'campoDeBatalla' && event.container.id === 'pokemones') {
      // Asegurarse de que el elemento a transferir tiene la propiedad `pv`
      const pokemon: Pokemon = event.previousContainer.data[event.previousIndex];
      this.AgregarComentarioACaja(`${ pokemon.nombre } sale del campo de batalla!`)
      pokemon.pv = 200;  // Establecer la propiedad `pv` a 200
      pokemon.estiloBatalla = 'bg-green-500'  // Reiniciar estilo `pv` a 200
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    // Detectar si el Pokémon acaba de entrar al campo de batalla
    if (event.container.id === 'campoDeBatalla') {
      const pokemon: Pokemon = event.container.data[event.currentIndex];
      this.AgregarComentarioACaja(`${pokemon.nombre} entra al campo de batalla!`);
    }

  }

  pokemonActivo: number = 0

  animar: boolean = false;
  shake: boolean = false;
  buff: boolean = false;
  toLeft: boolean= false;
  toRight: boolean= false;
  derrotado: boolean= false;
  puedeAtacar: boolean = true;

  activarAnimacionAtacar(orientacion: number) {
    
    setTimeout(() => {
      this.shake = true;
      setTimeout(() => this.shake = false, 300);
    }, 400);

    //Si es el pokemon de la izquierda, entonces animación de la atacar hacia la derecha
    if(this.pokemonActivo === 0 && orientacion != 0){
      this.toRight = true;
      setTimeout(() => this.toRight = false, 1000);
    }else{
      this.toLeft = true;
      setTimeout(() => this.toLeft = false, 1000);
    }

  }

  activarAnimacionBuff(animacion: number = 0){

    if( animacion === 1 ){

      this.buff = true;
    setTimeout(() => this.buff = false, 500); // Reset después de 0.5s

    setTimeout( () => {
      this.puedeAtacar = true
    }, 500)

    }else{

      this.animar = true;
      setTimeout(() => this.animar = false, 500); // Reset después de 0.5s
  
      setTimeout( () => {
        this.puedeAtacar = true
      }, 500)
    }
  }

  activarAnimacionPokemonDerrotado(indexRival: number){
    this.derrotado = true;
    setTimeout(() => this.derrotado = false, 2000); // Reset después de 0.5s

    setTimeout( () => {
      
      this.puedeAtacar = true

      this.sacarAPokemonDelCampoDeBatalla( this.campoDeBatalla, this.pokemones, indexRival, 0)

    }, 2000)

  }

  sacarAPokemonDelCampoDeBatalla(fromArray: any[], toArray: any[], fromIndex: number, toIndex: number): void {
    this.campoDeBatalla.map( pokemon => {
      pokemon.pv = 200
      pokemon.estiloBatalla = 'bg-green-500'
    }) 
    const item = fromArray[fromIndex];  // Obtener el elemento de origen
    fromArray.splice(fromIndex, 1);     // Eliminar el elemento del arreglo de origen
    toArray.splice(toIndex, 0, item);   // Insertar el elemento en el arreglo de destino
  }


  atacar(pokemon: Pokemon, index: number) {

    if(this.campoDeBatalla.length === 1) return

    const indexRival = index === 0 ? 1 : 0
    
    this.puedeAtacar = false
    
    this.pokemonActivo = index
    
    this.calcularDaño(indexRival)
    
    
  }
  
  calcularDaño(indexRival: number){
    const pokemonContrario = this.campoDeBatalla[indexRival]

    pokemonContrario.pv -= determinarEfectividad(this.campoDeBatalla[ this.pokemonActivo ], this.campoDeBatalla[indexRival])

    if(pokemonContrario.pv < 0) pokemonContrario.pv = 0
    
    
    if( pokemonContrario.pv > 160){
      this.campoDeBatalla[indexRival].estiloBatalla = 'bg-yellow-400'; // Vida alta
    } else if (pokemonContrario.pv > 120) {
      this.campoDeBatalla[indexRival].estiloBatalla = 'bg-yellow-500'; // Vida alta
    } else if (pokemonContrario.pv > 80) {
      this.campoDeBatalla[indexRival].estiloBatalla = 'bg-orange-500'; // Vida media
    } else if (pokemonContrario.pv > 30){
      this.campoDeBatalla[indexRival].estiloBatalla = 'bg-red-500'; // Vida baja
    }else this.campoDeBatalla[indexRival].estiloBatalla = 'bg-red-800'; //Vida muy baja
    
    if(pokemonContrario.pv <= 1){

      this.AgregarComentarioACaja( `Parece que ${this.campoDeBatalla[this.pokemonActivo].nombre} ha logrado debilitar a su oponente ${ this.campoDeBatalla[indexRival].nombre }, ${ this.campoDeBatalla[indexRival].nombre } no puedo continuar esta batalla. ${this.campoDeBatalla[this.pokemonActivo].nombre} es el ganador.` )
      this.activarAnimacionPokemonDerrotado( indexRival )
    }
    else{

      this.AgregarComentarioACaja( `${this.campoDeBatalla[this.pokemonActivo].nombre} ataca a su rival ${this.campoDeBatalla[indexRival].nombre } y generó ${Math.floor(determinarEfectividad(this.campoDeBatalla[this.pokemonActivo], this.campoDeBatalla[indexRival])) } puntos de daño, es un ataque ${ obtenerEfectividad( this.campoDeBatalla[this.pokemonActivo].tipo, this.campoDeBatalla[indexRival].tipo) }` )
      
      this.activarAnimacionAtacar( this.campoDeBatalla[ this.pokemonActivo ].orientacion )

      setTimeout(() => {
        this.puedeAtacar = true
      }, 1000);
    }


  }


  //Comentarios
  comentarios: Comentario[] = []

  AgregarComentarioACaja(texto: string){
    if( this.comentarios.some(x => true)) this.comentarios.reverse()[0].diseno = 'text-gray-200'

    this.comentarios.reverse()

    this.comentarios.push(
      {
        texto,
        diseno: 'text-white text-xl'
      }
    )
  }

  //Acciones
  
  editarEstadisticas(indexPokemon: number, key: number, valor: number){
    
    this.pokemonActivo = indexPokemon

    if(key === 0){
      if(valor === 0){
        if( this.campoDeBatalla[indexPokemon].atk === 100 ){
          this.AgregarComentarioACaja(`El ataque de ${ this.campoDeBatalla[indexPokemon].nombre } no puede aumentar más.`)
        }else{
          this.AgregarComentarioACaja(`${ this.campoDeBatalla[indexPokemon].nombre } ha aumentado su poder.`)
          this.campoDeBatalla[indexPokemon].atk++
        }
        this.activarAnimacionBuff()
      }else{
        if( this.campoDeBatalla[indexPokemon].atk === 1){
          this.AgregarComentarioACaja(`El ataque de ${ this.campoDeBatalla[indexPokemon].nombre } no puede disminuir.`)
        }else{
          this.campoDeBatalla[indexPokemon].atk--
          this.AgregarComentarioACaja(`${ this.campoDeBatalla[indexPokemon].nombre } ha disminuido su poder.`)
        }
        
        this.activarAnimacionBuff(1)
      }
    }else{
      if(valor === 0){
        if( this.campoDeBatalla[indexPokemon].def === 100){
          this.AgregarComentarioACaja(`La defensa de ${ this.campoDeBatalla[indexPokemon].nombre } no puede aumentado más.`)
        }else{
          this.campoDeBatalla[indexPokemon].def++
          this.AgregarComentarioACaja(`${ this.campoDeBatalla[indexPokemon].nombre } ha aumentado su defensa.`)
        }
        
        this.activarAnimacionBuff()
      }else{
        if( this.campoDeBatalla[indexPokemon].def === 1){
          this.AgregarComentarioACaja(`La defensa de ${ this.campoDeBatalla[indexPokemon].nombre } no puede disminuir más.`)
        }else{
          this.campoDeBatalla[indexPokemon].def--
          this.AgregarComentarioACaja(`${ this.campoDeBatalla[indexPokemon].nombre } ha disminuido su defensa.`)
        }
        
        this.activarAnimacionBuff(1)
      }
      
    }
    
  }
  
  curarPokemon(indexPokemon: number){
    
    this.AgregarComentarioACaja(`Parece que ${ this.campoDeBatalla[indexPokemon].nombre } ha recuperado su energía`)

    this.campoDeBatalla[ indexPokemon ].pv = 200
    this.campoDeBatalla[ indexPokemon ].estiloBatalla = 'bg-green-500'

    this.pokemonActivo = indexPokemon

    this.activarAnimacionBuff()
  }

  enabled: boolean = true
  textAccionesToggle = 'ocultar'
  //Mostrar/ocultar acciones
  toggle() {
    this.enabled = !this.enabled

    if( this.enabled) {
      this.textAccionesToggle = 'ocultar'
    }else{
      this.textAccionesToggle = 'mostrar'
    }
  }

}
