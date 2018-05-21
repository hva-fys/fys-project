import { Component, OnInit, HostListener } from '@angular/core';
import { fadeInOut } from '../../../animations';
import { Logger, ILoggable } from '../../../shared/logger';
import { IProduct, products } from '../products';
import { MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators/take';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StateService } from '../state.service';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';


@Logger()
@Component({
  selector: 'fys-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [fadeInOut]
})
export class ProductListComponent implements OnInit, ILoggable {
  logger: Partial<Console>;


  public products: IProduct[] = products;

  public category = 'Watches';

  public prices: number[] = Array(10).fill(null).map( (el, index) => (index + 1) * 100 );

  public lastScrollPosition: number;

  public total$: Observable<number> = this.state$.cart$.pipe(
    filter( cart => Boolean(cart)),
    map(cart => cart.total)
  );

  constructor(
    private toast: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private state$: StateService
  ) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(e: Event) {


    if ( window.scrollY > this.lastScrollPosition ) {
      this.logger.log('going up');
    } else {
      this.logger.log('going down');
    }

    this.lastScrollPosition = window.scrollY;
  }

  ngOnInit() {
  }

  addToCart(id: string ) {
    const addedProduct = products.find(product => product.id === id);

    const toast = this.toast.open(`${addedProduct.name} added to cart`, 'Open cart');


    toast.onAction().pipe( take(1) ).subscribe(() => {
      this.router.navigate(['./checkout'], { relativeTo: this.route });
    });

    this.state$.addToCart(addedProduct);
  }

}
