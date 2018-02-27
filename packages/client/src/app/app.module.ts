import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GpsTrackerComponent } from '../components/gps-tracker/gps-tracker.component';


@NgModule({
  declarations: [
    AppComponent,
    GpsTrackerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
