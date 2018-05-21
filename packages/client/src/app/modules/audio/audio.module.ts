import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioHomepageComponent } from './audio-homepage/audio-homepage.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: AudioHomepageComponent }
];

export const RoutingConfig: ModuleWithProviders = RouterModule.forChild(routes);


@NgModule({
  imports: [
    CommonModule,
    RoutingConfig,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [AudioHomepageComponent ]
})
export class AudioModule { }
