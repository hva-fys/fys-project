import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil, map, filter, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Logger, ILoggable } from '../../shared/logger';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Webshop } from 'fys';

export interface ICartLine extends Webshop.IProduct {
  quantity: number;
}

export interface ICart {
  lines: ICartLine[];
  total: number;
}

@Logger()
@Injectable()
export class StateService implements OnDestroy, ILoggable {

  logger: Partial<Console>;
  public cart$ = new BehaviorSubject<ICart>(null);

  private stop$ = new Subject<void>();

  constructor(private http: HttpClient ) {
    this.cart$.pipe(
      takeUntil(this.stop$),
      filter(Boolean),
      map(cart => JSON.stringify(cart)),
      tap(cart => this.logger.log('changing cart...', cart))
    ).subscribe( cart => localStorage.setItem('cart', cart) );

    this.getInitialCart();
  }

  public getInitialCart() {
    let currentCart: ICart = JSON.parse(localStorage.getItem('cart'));

    if ( !currentCart ) {
      currentCart = {
        lines: [],
        total: 0
      };
    }

    this.cart$.next(currentCart);
  }

  public addToCart(product: Webshop.IProduct) {
    const currentCart = this.cart$.value;

    const productMatchIndex = currentCart.lines.findIndex( possibleMatch => possibleMatch.id === product.id );

    const productMatch = currentCart.lines[productMatchIndex];

    const newLines: ICartLine[] = [...currentCart.lines ];

    // If we already have the product, we only want to append its quantity
    if ( productMatch ) {
      newLines[productMatchIndex].quantity = newLines[productMatchIndex].quantity + 1;
    } else {
      const newProductLine: ICartLine = {
        ...product, quantity: 1
      };
      newLines.push(newProductLine);
    }

    this.logger.log(newLines);

    const newTotal = this.calculateCartTotal(newLines);

    const newCart: ICart = {
      lines: newLines,
      total: newTotal
    };

    this.cart$.next(newCart);
  }

  public getProducts(): Observable<Webshop.IProduct[]> {
    this.logger.log('getting products...');
    const stream$ = this.http.get<Webshop.IProduct[]>(`http://${environment.END_POINT_URL}/api/products/list`);

    stream$.subscribe( products => this.logger.log( products ));

    return stream$;
  }

  private calculateCartTotal(products: ICartLine[]): number {
    const total = products
      .map( prod => prod.price * prod.quantity )
      .reduce((a, b) => a + b, 0);

    return total;
  }

  ngOnDestroy(): void {
    this.stop$.next();
  }

}
