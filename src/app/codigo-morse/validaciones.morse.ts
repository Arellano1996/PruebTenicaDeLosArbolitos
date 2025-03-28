import { AbstractControl, ValidationErrors } from "@angular/forms";

// Expresión regular modificada para aceptar solo los caracteres que mencionaste (letras, números y los caracteres especiales mencionados)
const validNaturalChars = /^[A-Z0-9.,?"\/\s]*$/i; // Permite letras, números y los caracteres '.', ',', '?', '"', '/'

// Expresión regular para código Morse, sigue permitiendo solo caracteres válidos en Morse
const validMorseChars = /^[.\-\s]+$/; // Solo permite código Morse puro

export function morseTextValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value ? control.value.trim() : null;  // Eliminar espacios extra al inicio y final
  
  if (!value) return null; // Permitir input vacío si no es requerido

  // Permitir texto natural con caracteres especiales o código Morse
  const isNaturalText = validNaturalChars.test(value);
  const isMorseText = validMorseChars.test(value);

  return isNaturalText || isMorseText ? null : { invalidFormat: true };
}
