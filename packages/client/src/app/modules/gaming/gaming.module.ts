import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { GamingHomeComponent } from './gaming-home/gaming-home.component';
import { SnakeComponent } from './snake/snake.component';

const routes: Routes = [
  { path: '', component: GamingHomeComponent },
  { path: 'snake', component: SnakeComponent }
];

export const RoutingConfig: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [
    CommonModule,
    RoutingConfig,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [GamingHomeComponent, SnakeComponent]
})
export class GamingModule { }
