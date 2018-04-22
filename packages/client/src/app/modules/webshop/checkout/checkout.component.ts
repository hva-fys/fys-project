import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { StateService, ICartLine } from '../state.service';
import { IProduct } from '../products';

@Component({
  selector: 'fys-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public displayedColumns = ['imageUrl', 'name', 'price', 'quantity', 'total'];

  public total$: Observable<number> = this.state$.cart$.pipe(
    filter(cart => Boolean(cart)),
    map(cart => cart.total)
  );

  public products$: Observable<IProduct[]> = this.state$.cart$.pipe(
    map( cart => cart.lines),
    map( lines => {

      const sum = (a, b) => a + b;

      const quantity = lines.map( line => line.quantity ).reduce(sum, 0);

      const total = lines.map( line => line.quantity * line.price ).reduce(sum, 0);


      const newLine: ICartLine = {
        id: null,
        imageUrl: null,
        name: 'Total',
        price: total,
        quantity,
      };

      const newLines = [...lines, newLine];

      return newLines;
    })
  );

  constructor(private state$: StateService) { }

  ngOnInit() {
  }

}
