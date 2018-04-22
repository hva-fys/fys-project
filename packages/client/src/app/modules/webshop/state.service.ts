import { Injectable, OnDestroy } from '@angular/core';
import { IProduct } from './products';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil, map, filter, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Logger, ILoggable } from '../../shared/logger';

export interface ICartLine extends IProduct {
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

  constructor() {
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

  public addToCart(product: IProduct) {
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
