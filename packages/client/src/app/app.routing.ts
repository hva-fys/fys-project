import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';


export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'tic-tac-toe', loadChildren: 'app/modules/tic-tac-toe/tic-tac-toe.module#TicTacToeModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
