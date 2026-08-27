import { Routes } from '@angular/router';
import { ComingSoonComponent } from './experiencias/shared/coming-soon/coming-soon.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full'},

    {
        path: 'inicio',
        loadComponent: () =>
            import('./home/home').then((m) => m.HomeComponent)
    },

    {
        path: 'experiencias',
        loadComponent: () =>
            import('./experiencias/experiencias-menu/experiencias-menu')
                .then((m) => m.ExperienciasMenuComponent)
    },

    {
        path: 'experiencias/desafio-logica',
        loadComponent: () =>
            import('./experiencias/logic-challenge/logic-challenge')
                .then((m) => m.LogicChallengeComponent)
    },

    {
        path: 'experiencias/sistema-invadido',
        loadComponent: () =>
            import('../../sistema-invadido/frontend/src/app/app')
                .then((m) => m.App)
    },
    
    {
        path: 'experiencias/banco-de-dados',
        component: ComingSoonComponent,
        data: { title: 'Banco de Dados', emoji: '💾' }
    },
    {
        path: 'experiencias/codigo-misterioso',
        component: ComingSoonComponent,
        data: { title: 'Código Misterioso', emoji: '💻' }
    },
    {
        path: 'experiencias/desafio-ia',
        component: ComingSoonComponent,
        data: { title: 'Desafio da IA', emoji: '🤖' }
    },
    {
        path: 'experiencias/cidade-inteligente',
        component: ComingSoonComponent,
        data: { title: 'Cidade Inteligente', emoji: '🏙' }
    },
    {
        path: 'experiencias/mini-game',
        component: ComingSoonComponent,
        data: { title: 'Mini Game ADS', emoji: '🎮' }
    },

    { path: '**', redirectTo: 'inicio' }
];