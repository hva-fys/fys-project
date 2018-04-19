import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioHomepageComponent } from './audio-homepage/audio-homepage.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AudioHomepageComponent }
];


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AudioHomepageComponent]
})
export class AudioModule { }
