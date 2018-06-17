import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { GamingHomeComponent } from './gaming-home/gaming-home.component';
import { SnakeComponent } from './snake/snake.component';
import { PongComponent } from './pong/pong.component';
import { MobileControlsComponent } from './mobile-controls/mobile-controls.component';

const routes: Routes = [
  { path: '', component: GamingHomeComponent },
  { path: 'snake', component: SnakeComponent },
  { path: 'pong', component: PongComponent }
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
  declarations: [
    GamingHomeComponent,
    SnakeComponent,
    PongComponent,
    MobileControlsComponent
  ]
})
export class GamingModule { }
