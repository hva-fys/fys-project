import { Component, OnInit } from '@angular/core';
import { FlightStatusService } from '../../services/flight-status.service';

@Component({
  selector: 'fys-flight-status',
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.scss']
})
export class FlightStatusComponent implements OnInit {

  public progress$ = this.flightStatusService.progress$;
  public from = 'AMS';
  public to = 'CAI';

  constructor(private flightStatusService: FlightStatusService) { }

  ngOnInit() {}

}
