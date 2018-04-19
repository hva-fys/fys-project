import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioHomepageComponent } from './audio-homepage/audio-homepage.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AudioHomepageComponent }
];

export const RoutingConfig: ModuleWithProviders = RouterModule.forChild(routes);


@NgModule({
  imports: [
    CommonModule,
    RoutingConfig
  ],
  declarations: [AudioHomepageComponent ]
})
export class AudioModule { }
