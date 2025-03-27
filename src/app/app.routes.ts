import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'inicio',
        loadComponent: () => import('./hero/hero.component')
    },
    {
        path: 'años-bisiestos',
        pathMatch: 'full',
        title: 'Añios Bisiestos',
        loadComponent: () => import('./anios-bisiestos/anios-bisiestos.component')
    },
    {
        path: 'the-legend-of-zelda',
        pathMatch: 'full',
        title: 'The Legend of Zelda',
        loadComponent: () => import('./the-legend-of-zelda/the-legend-of-zelda.component')
    },
    {
        path: 'codigo-morse',
        pathMatch: 'full',
        title: 'Código Morse',
        loadComponent: () => import('./codigo-morse/codigo-morse.component')
    },
    {
        path: 'batalla-pokemon',
        pathMatch: 'full',
        title: 'Batalla Pokemon',
        loadComponent: () => import('./batalla-pokemon/batalla-pokemon.component')
    },
    {
        path: '**',
        pathMatch: 'full',
        title: 'Página no encontrada',
        loadComponent: () => import('./shared/nofound/nofound.component')
    },
];
