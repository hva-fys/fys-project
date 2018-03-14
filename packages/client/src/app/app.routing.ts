import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


export const routes: Routes = [
  { path: 'tic-tac-toe', loadChildren: 'app/modules/tic-tac-toe/tic-tac-toe.module#TicTacToeModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
