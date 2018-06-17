import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';


export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'webshop',        loadChildren: 'app/modules/webshop/webshop.module#WebshopModule' },
  { path: 'audio',          loadChildren: 'app/modules/audio/audio.module#AudioModule' },
  { path: 'video',          loadChildren: 'app/modules/video/video.module#VideoModule' },
  { path: 'login',          loadChildren: 'app/modules/login/login.module#LoginModule' },
  { path: 'flight-status',  loadChildren: 'app/modules/flight-status/flight-status.module#FlightStatusModule' },
  { path: 'gaming',         loadChildren: 'app/modules/gaming/gaming.module#GamingModule' },
  { path: 'tic-tac-toe',    loadChildren: 'app/modules/tic-tac-toe/tic-tac-toe.module#TicTacToeModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
