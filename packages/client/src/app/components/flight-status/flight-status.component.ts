import { Component, OnInit } from '@angular/core';
import { FlightStatusService } from '../../services/flight-status.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FlightInformation } from 'fys';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'fys-flight-status',
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.scss'],
})
export class FlightStatusComponent implements OnInit {

  public progress$ = this.flightStatusService.progress$;
  public from = 'AMS';
  public to = 'CAI';

  /**
   * ETA of the plane, todo return the amount of time in milliseconds and use moment durations to humanize that for the user
   * @see https://momentjs.com/docs/#/durations/humanize/
   */
  public eta$ = this.flightStatusService.state.plane$.pipe(
    map( plane => 2 )
  );

  /** What to show to the user right now */
  public showETA = false;

  constructor(private flightStatusService: FlightStatusService) {
    this.flightStatusService.getCurrentFlight()
      .subscribe( (flightInfo: FlightInformation.IFlight) => {
          this.from = flightInfo.start.shortHand;
          this.to = flightInfo.end.shortHand;
      });
  }

  ngOnInit() {
    setInterval(() => {
      this.showETA = !this.showETA;
    }, 3000);
  }

}
