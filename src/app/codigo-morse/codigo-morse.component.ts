import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { morseTextValidator } from './validaciones.morse';

@Component({
  selector: 'app-codigo-mose',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './codigo-morse.component.html',
  //styleUrl: './codigo-mose.component.css'
})
export default class CodigoMorseComponent {

  codigo: string = `
  textoAMorse(text: string): string {
    text = text.toUpperCase().trim();

    return text.split(' ').map(word => {
      return word.split('').map(char => this.morseCodeMap[char] || '').join(' '); // Separar letras por un solo espacio
    }).join('  '); // Unir las palabras con doble espacio
  }
  
  morseATexto(morseCode: string): string {
    const morseWords = morseCode.trim().split('  ');  // Doble espacio separa palabras
    let decodedText = '';
  
    for (let i = 0; i < morseWords.length; i++) {
      const morseChars = morseWords[i].split(' ');
      for (let j = 0; j < morseChars.length; j++) {
        const morseChar = morseChars[j].trim();  // Aseguramos que no haya espacios extra
        const naturalChar = Object.keys(this.morseCodeMap).find(key => this.morseCodeMap[key] === morseChar);
  
        if (naturalChar) {
          decodedText += naturalChar;
        } else {
          decodedText += '?';  // Si no encontramos el carácter, agregamos un '?'
        }
      }
  
      if (i < morseWords.length - 1) {
        decodedText += ' ';
      }
    }
  
    return decodedText;
  }
  `;

  enabled: boolean = false
  enabledDiccionario: boolean = false

  morseCodeMap: any = {
    "A": ".-",         "B": "-...",     "C": "-.-.",     "D": "-..", 
    "E": ".",          "F": "..-.",     "G": "--.",      "H": "....", 
    "I": "..",         "J": ".---",     "K": "-.-",      "L": ".-..", 
    "M": "--",         "N": "-.",       "O": "---",      "P": ".--.", 
    "Q": "--.-",       "R": ".-.",      "S": "...",      "T": "-", 
    "U": "..-",        "V": "...-",     "W": ".--",      "X": "-..-", 
    "Y": "-.--",       "Z": "--..",     "0": "-----",    "1": ".----", 
    "2": "..---",      "3": "...--",    "4": "....-",    "5": ".....", 
    "6": "-....",      "7": "--...",    "8": "---..",    "9": "----.", 
    ".": ".-.-.-",     ",": "--..--",   "?": "..--..",   '"': ".-..-.", 
    "/": "-..-."
  };

  // Convertir el objeto morseCodeMap en un array de pares [clave, valor]
  getMorseCodeEntries(): [string, string][] {
    
    return Object.entries(this.morseCodeMap)


  }

  constructor() {
    this.getMorseCodeEntries()    
  }
  

  fB = inject(FormBuilder)

  formulario: FormGroup = this.fB.group({
    texto: [, [ Validators.required, Validators.min(1), morseTextValidator ],/* validadores asyncronos*/]
  })

  resultado = {
    natural: '',
    morse: '',
    detector: 'reconociendo texto...',
    estiloDetector: 'bg-gray-500 border border-gray-100',
    isMorse: false

  }
  //Mostrar errores en mi vista
  esValidoElCampos(nombreCampo: string) : boolean | null {
    return !!this.formulario.controls[nombreCampo].errors && this.formulario.controls[nombreCampo].touched
  }

  onBlur(){
    const correoActual = this.formulario.controls['texto'].value
    //Si no se escribió nada entonces no validar el campo
    if( !correoActual ) this.formulario.markAsUntouched()
    
  }

  submit(){
    if( this.formulario.invalid){
      this.formulario.markAllAsTouched()
      return
    }

    //logica
    const texto = this.formulario.controls['texto'].value
    // Ejemplo de uso
    if(this.resultado.isMorse){
      this.resultado.natural = this.morseToText( texto )
      this.resultado.morse = texto
    }else{
      this.resultado.natural = texto
      this.resultado.morse = this.textToMorse( texto )
    }

  }
  
  toggle() {
    this.enabled = !this.enabled

    if( this.enabled ){
      this.formulario.controls['texto'].patchValue('')
    } 
  }
  toggleDiccionario() {
    this.enabledDiccionario = !this.enabledDiccionario

    if( this.enabled ){
      this.formulario.controls['texto'].patchValue('')
    } 
  }

  onInputChange() {

    const texto = this.formulario.controls['texto'].value
    this.formulario.controls['texto'].patchValue( texto.toUpperCase() )
    if( this.enabled) {
      
      //Tomamos el último caracter
      const nuevoTexto = texto.length > 0 ? this.textToMorse( texto.charAt(texto.length - 1) ) : this.textToMorse( texto.charAt(texto.length) );

      const nuevoTextoAMorse = this.textToMorse( nuevoTexto )

      if( texto.length === 1){
        this.formulario.controls['texto'].patchValue( nuevoTexto )
      }else{
        const textoSinUltimoCaracter = texto.slice(0, -1)
        this.formulario.controls['texto'].patchValue( `${ textoSinUltimoCaracter } ${nuevoTexto}` )

      }
      
    }

    if( !this.formulario.valid ) {
      this.resultado.detector = 'reconociendo texto...'
      this.resultado.estiloDetector = 'bg-gray-500 border border-gray-100'
      return
    }



    this.isMorse( this.formulario.controls['texto'].value )
  }

  
  textToMorse(text: string): string {
    // Eliminar espacios en blanco y convertir el texto a mayúsculas
    text = text.toUpperCase().trim();

    // Convertir el texto a código Morse
    return text.split(' ').map(word => {
      // Para cada palabra, mapeamos sus letras al código Morse
      return word.split('').map(char => this.morseCodeMap[char] || '').join(' '); // Separar letras por un solo espacio
    }).join('  '); // Unir las palabras con doble espacio
  }
  
  morseToText(morseCode: string): string {
    // Separamos las palabras por doble espacio (espacio entre palabras)
    const morseWords = morseCode.trim().split('  ');  // Doble espacio separa palabras
    let decodedText = '';
  
    // Recorremos las palabras
    for (let i = 0; i < morseWords.length; i++) {
      // Separamos los caracteres dentro de cada palabra por un solo espacio
      const morseChars = morseWords[i].split(' ');
      for (let j = 0; j < morseChars.length; j++) {
        const morseChar = morseChars[j].trim();  // Aseguramos que no haya espacios extra
  
        // Buscar el carácter correspondiente en el mapa de Morse
        const naturalChar = Object.keys(this.morseCodeMap).find(key => this.morseCodeMap[key] === morseChar);
  
        if (naturalChar) {
          decodedText += naturalChar;
        } else {
          decodedText += '?';  // Si no encontramos el carácter, agregamos un '?'
        }
      }
  
      // Si no es la última palabra, agregamos un espacio
      if (i < morseWords.length - 1) {
        decodedText += ' ';
      }
    }
  
    return decodedText;
  }
  
  isMorse(text: string): boolean {

    const isMorse = /^[.\-\s]+$/.test(text) 

    if( isMorse ){
      this.resultado.detector = 'Código Morse'
      this.resultado.estiloDetector = 'bg-purple-500 border border-purple-100'
      this.resultado.isMorse = true
    } 
    else {
      this.resultado.detector = 'Lenguaje Natural'
      this.resultado.estiloDetector = 'bg-blue-500 border border-blue-100'
      this.resultado.isMorse = false
    }

    return isMorse
  }
  
  naturalAInput(){
    const texto = this.resultado.natural
    this.formulario.controls['texto'].patchValue( texto )
    this.isMorse(texto)
  }
  
  morseAInput(){
    const texto = this.resultado.morse
    this.formulario.controls['texto'].patchValue( texto )
    this.isMorse( texto )
  }
  
  
  

}
