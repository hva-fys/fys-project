import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';


export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'tic-tac-toe', loadChildren: 'app/modules/tic-tac-toe/tic-tac-toe.module#TicTacToeModule' },
  { path: 'webshop', loadChildren: 'app/modules/webshop/webshop.module#WebshopModule' },
  { path: 'audio', loadChildren: 'app/modules/audio/audio.module#AudioModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
