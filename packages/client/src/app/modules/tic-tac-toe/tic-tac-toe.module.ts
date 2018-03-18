import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { Routes, RouterModule } from '@angular/router';
import { TicTacToeService } from './tic-tac-toe.service';
import { RoomsComponent } from './rooms/rooms.component';
import { FormsModule } from '@angular/forms';


import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'game/:id', component: TicTacToeComponent, data: {
    title: 'Tic tac toe'
  }}
];

export const RoutingConfig: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    RoutingConfig,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    FormsModule
  ],
  declarations: [TicTacToeComponent, RoomsComponent],
  providers: [TicTacToeService]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicTacToeModule { }
