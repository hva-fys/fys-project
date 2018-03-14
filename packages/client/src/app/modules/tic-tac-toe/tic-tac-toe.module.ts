import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { Routes, RouterModule } from '@angular/router';
import { TicTacToeService } from './tic-tac-toe.service';



const routes: Routes = [
  { path: '', component: TicTacToeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [TicTacToeComponent],
  providers: [TicTacToeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicTacToeModule { }
