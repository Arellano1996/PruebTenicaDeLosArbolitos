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
}

