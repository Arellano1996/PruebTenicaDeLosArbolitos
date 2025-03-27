import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-anios-bisiestos',
  imports: [ CommonModule ,ReactiveFormsModule ],
  templateUrl: './anios-bisiestos.component.html',
  //styleUrl: './anios-bisiestos.component.css'
})
export default class AniosBisiestosComponent {

  codigo: string = `
  getProximosAniosBisiestos(anio: number): number[] {
    const aniosBisiestos: number[] = [];
    let proximoAnio = anio + (4 - (anio % 4));
      while (aniosBisiestos.length < 30) {
        if (proximoAnio % 100 !== 0 || proximoAnio % 400 === 0) aniosBisiestos.push(proximoAnio);
        proximoAnio += 4;
      }
      return aniosBisiestos;
    }
  }`;

  fB = inject(FormBuilder)

  formulario: FormGroup = this.fB.group({
    anio: [, [ Validators.required, Validators.min(1), Validators.pattern(/^\d+$/) ],/* validadores asyncronos*/]
  })

  resultado = {
    año: 1900,
    proxAñosBisiestos: [1900, 1900]
  }
  //Mostrar errores en mi vista
  esValidoElCampos(nombreCampo: string) : boolean | null {
    return !!this.formulario.controls[nombreCampo].errors && this.formulario.controls[nombreCampo].touched
  }

  onBlur(){

    const correoActual = this.formulario.controls['anio'].value

    //Si no se escribió nada entonces no validar el campo
    if( !correoActual ) this.formulario.markAsUntouched()
    
  }

  submit(){
    if( this.formulario.invalid){
      this.formulario.markAllAsTouched()
      return
    }

    //logica
    const anio: number = this.formulario.controls['anio'].value 
    
    this.resultado.año = anio
    this.resultado.proxAñosBisiestos = this.getProximosAniosBisiestos( anio )

  }
  
  getProximosAniosBisiestos(anio: number): number[] {
    const aniosBisiestos = [];
    let proximoAnio = anio + (4 - (anio % 4)); // Encuentra el próximo múltiplo de 4
  
    while (aniosBisiestos.length < 30) {
      // Validar si es bisiesto (ya que no todos los múltiplos de 4 lo son)
      if (proximoAnio % 100 !== 0 || proximoAnio % 400 === 0) {
        aniosBisiestos.push( proximoAnio );
      }
      proximoAnio += 4; // Saltamos de 4 en 4 directamente
    }
  
    console.log('Próximos años bisiestos:', aniosBisiestos);
    return aniosBisiestos;
  }
  

}
