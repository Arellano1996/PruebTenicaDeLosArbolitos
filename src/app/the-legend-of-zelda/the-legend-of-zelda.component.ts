import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-the-legend-of-zelda',
  imports: [ CommonModule, ReactiveFormsModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './the-legend-of-zelda.component.html',
  //styleUrl: './the-legend-of-zelda.component.css'
})
export default class TheLegendOfZeldaComponent {

  codigo: string = `
  calcularDiasEntreFechas(){
    const inicio = new Date( this.comprarFechas[0].FechaLanzamiento );
    const fin = new Date( this.comprarFechas[1].FechaLanzamiento );
    
    const diferenciaMilisegundos = Math.abs(fin.getTime() - inicio.getTime());
    const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    
    return diferenciaDias
  }
  `
  error: string = ''
  resultado: string = ''

  listaJuegos = [
    {
      Nombre: 'Zelda II: The Adventure of Link',
      Cover: '14Dic1987.jpg',
      FechaLanzamiento: '1987-12-14'
    },
    {
      Nombre: 'The Legend of Zelda: A Link to the Past',
      Cover: '21Nov1991.jpg',
      FechaLanzamiento: '1991-11-21'
    },
    {
      Nombre: 'The Legend of Zelda: Link\'s Awakening',
      Cover: '06Jun1993.jpg',
      FechaLanzamiento: '1993-06-06'
    },
    {
      Nombre: 'The Legend of Zelda: Ocarina of Time',
      Cover: '21Nov1998.jpg',
      FechaLanzamiento: '1998-11-21'
    },
    {
      Nombre: 'The Legend of Zelda: Majora\'s Mask',
      Cover: '27Abr2000.jpg',
      FechaLanzamiento: '2000-04-27'
    },
    {
      Nombre: 'The Legend of Zelda: Oracle of Seasons y Oracle of Ages',
      Cover: '14Feb2001.jpg',
      FechaLanzamiento: '2001-02-14'
    },
    {
      Nombre: 'The Legend of Zelda: The Wind Waker',
      Cover: '13Dic2002.jpg',
      FechaLanzamiento: '2002-12-13'
    },
    {
      Nombre: 'The Legend of Zelda: Four Swords Adventures',
      Cover: '07Jun2004.jpg',
      FechaLanzamiento: '2004-06-07'
    },
    {
      Nombre: 'The Legend of Zelda: The Minish Cap',
      Cover: '04Nov2004.jpg',
      FechaLanzamiento: '2004-11-04'
    },
    {
      Nombre: 'The Legend of Zelda: Twilight Princess',
      Cover: '19Nov2006.jpg',
      FechaLanzamiento: '2006-11-19'
    },
    {
      Nombre: 'The Legend of Zelda: Phantom Hourglass',
      Cover: '23Jun2007.jpg',
      FechaLanzamiento: '2007-06-23'
    },
    {
      Nombre: 'The Legend of Zelda: Spirit Tracks',
      Cover: '07Dic2009.jpg',
      FechaLanzamiento: '2009-12-07'
    },
    {
      Nombre: 'The Legend of Zelda: Skyward Sword',
      Cover: '20Nov2011.jpg',
      FechaLanzamiento: '2011-11-20'
    },
    {
      Nombre: 'The Legend of Zelda: A Link Between Worlds',
      Cover: '22Nov2013.jpg',
      FechaLanzamiento: '2013-11-22'
    },
    {
      Nombre: 'The Legend of Zelda: Tri Force Heroes',
      Cover: '22Oct2015.jpg',
      FechaLanzamiento: '2015-10-22'
    },
    {
      Nombre: 'The Legend of Zelda: Breath of the Wild',
      Cover: '03Mar2017.jpg',
      FechaLanzamiento: '2017-03-03'
    },
    {
      Nombre: 'The Legend of Zelda: Tears of the Kingdom',
      Cover: '12May2023.jpg',
      FechaLanzamiento: '2023-05-12'
    }
  ];
  

  comprarFechas = [
    {
      Nombre: 'The Legend of Zelda',
      Cover: '21Feb1986.jpg',
      FechaLanzamiento: '1986-02-23'
    },
  ];

  drop(event: CdkDragDrop<any>) {
    // Si el contenedor de destino es "comprarFechas" y ya tiene 2 elementos, no permitir la transferencia
    if (event.container.id === 'comprarFechas' && event.container.data.length >= 2) {
      console.log('Div lleno')
      const primerElemento = event.container.data.shift(); // Elimina el primer elemento
      this.listaJuegos.push(primerElemento);
      //return; // Evita la transferencia si el contenedor ya tiene 2 elementos
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

    this.ordenarListaJuegos();
  }

  ordenarListaJuegos() {
    this.listaJuegos.sort((a, b) => {
      this.resultado = ''
      const fechaA = new Date(a.FechaLanzamiento);
      const fechaB = new Date(b.FechaLanzamiento);
      return fechaA.getTime() - fechaB.getTime(); // Orden ascendente
    });

    this.comprarFechas.sort((a, b) => {
      this.resultado = ''
      const fechaA = new Date(a.FechaLanzamiento);
      const fechaB = new Date(b.FechaLanzamiento);
      return fechaA.getTime() - fechaB.getTime(); // Orden ascendente
    });
  }

  calcularDiasEntreFechas(){
    console.log( this.comprarFechas )

    if( this.comprarFechas.length < 2) {

      console.log('No hay elementos suficientes')
      this.resultado = 'No hay elementos suficientes, arrastra otro elemento más'
      return
    }
    
    // Asegúrate de que las fechas sean objetos Date
    const inicio = new Date( this.comprarFechas[0].FechaLanzamiento );
    const fin = new Date( this.comprarFechas[1].FechaLanzamiento );
    
    const diferenciaMilisegundos = Math.abs(fin.getTime() - inicio.getTime());
    const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    
    console.log(`Diferencia en días: ${diferenciaDias}`);
    this.resultado = diferenciaDias.toString() + ' días'
    

  }

}
