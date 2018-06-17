import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { StateService } from '../state.service';
import { SessionServiceService } from '../../../services/session-service.service';

@Component({
  selector: 'fys-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public total$: Observable<number> = this.state$.cart$.pipe(
    filter(cart => Boolean(cart)),
    map(cart => cart.total)
  );


  constructor(private state$: StateService, public $sessionService: SessionServiceService) { }

  ngOnInit() {
  }

  pay() {
    alert('Payment complete');
  }

  changeCreditCard() {
    alert('To be complete...');
  }

}
