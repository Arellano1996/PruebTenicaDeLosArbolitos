import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-the-legend-of-zelda',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './the-legend-of-zelda.component.html',
  //styleUrl: './the-legend-of-zelda.component.css'
})
export default class TheLegendOfZeldaComponent {

  codigo: string = ''
  resultado: string = ''

  fB = inject(FormBuilder)

  formulario: FormGroup = this.fB.group({
    anio: [, [ Validators.required, Validators.min(1), Validators.pattern(/^\d+$/) ],/* validadores asyncronos*/]
  })

  
  //Mostrar errores en mi vista
  esValidoElCampos(nombreCampo: string) : boolean | null {
    return !!this.formulario.controls[nombreCampo].errors && this.formulario.controls[nombreCampo].touched
  }

  //FOrmulario
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
    //const anio: number = this.formulario.controls['anio'].value 
    
    //this.resultado.año = anio
    //this.resultado.proxAñosBisiestos = this.getProximosAniosBisiestos( anio )

  }
}
