import { Component, OnInit } from '@angular/core';
import { style, animate, trigger, transition, query, stagger, keyframes } from '@angular/animations';
import {FlightStatusService} from "../../../services/flight-status.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {FlightInformation} from "../../../../../../shared/fys-types";

@Component({
  selector: 'fys-flight-status',
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.scss']
})

export class FlightStatusComponent implements OnInit {
  lat = 53.78767124584938;
  lng = -0.9008782187499946;


  start = {
    lat: 54.66112372206639,
    lng: -1.8896484375
  };

  curr = {
    lat: 54.66112372206639,
    lng: -1.8896484375
  };

  dest = {
    lat: 52.36218321674427,
    lng: 4.921875
  };

  num = 0;

  speedLabelFn: Function = () => `${this.num} km/h`;

  private stop$ = new Subject<void>();

  private plane: FlightInformation.IPlane = {
    lat: 0,
    lng: 0,

    dist: 0,
    height: 0,
    speed: 0,
  };

  constructor(private flightStatusService: FlightStatusService) {
    this.flightStatusService.state.plane$.pipe(
      takeUntil(this.stop$)
    ).subscribe((plane) => this.plane = plane);
  }

  ngOnInit() {

  }

  next() {
    const latSteps = (this.dest.lat - this.start.lat) / 50;
    const lngSteps = (this.dest.lng - this.start.lng) / 50;

    this.curr = {
      lat: this.curr.lat + latSteps,
      lng: this.curr.lng + lngSteps
    };
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
