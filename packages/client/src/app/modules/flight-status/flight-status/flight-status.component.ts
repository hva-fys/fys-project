import { Component, OnInit } from '@angular/core';
import { style, animate, trigger, transition, query, stagger, keyframes } from '@angular/animations';
import { FlightStatusService } from '../../../services/flight-status.service';
import { FlightInformation } from 'fys';
import { WikipediaService } from '../../../services/wikipedia.service';

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

  public images = {
    cc: ['./assets/images/locations/cc/1.jpg', './assets/images/locations/cc/2.jpg', './assets/images/locations/cc/3.jpg'],
    hh: ['./assets/images/locations/hh/1.jpg', './assets/images/locations/hh/2.jpg', './assets/images/locations/hh/3.jpg']
  };

  public airplanes: Map<FlightInformation.TAirplane, string> = new Map();

  speedLabelFn: Function = () => `${this.num} km/h`;

  constructor(private $flightStatus: FlightStatusService, private $wikipedia: WikipediaService) {
    this.airplanes.set('a320', './assets/images/airplanes/a320.jpg');
    this.airplanes.set('737300', './assets/images/airplanes/737300.jpg');
    this.airplanes.set('737400', './assets/images/airplanes/737400.jpg');
    this.airplanes.set('737800', './assets/images/airplanes/737800.jpg');

    this.$wikipedia.getIntro('Cape Canaveral').subscribe();
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

    this.lat = this.curr.lat + latSteps;
    this.lng = this.curr.lng + lngSteps;
  }

}
