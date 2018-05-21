import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlightStatusComponent } from './flight-status/flight-status.component';
import { AgmCoreModule } from '@agm/core';
import { GaugeModule } from 'angular-gauge';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: FlightStatusComponent },
];

export const RoutingConfig: ModuleWithProviders = RouterModule.forChild(routes);


@NgModule({
  imports: [
    CommonModule,
    RoutingConfig,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAaoLkUMIIPhhou7krj2uVxLntrMI8l-gU',
    }),
    GaugeModule.forRoot(),
    FormsModule
  ],
  declarations: [FlightStatusComponent]
})
export class FlightStatusModule { }
