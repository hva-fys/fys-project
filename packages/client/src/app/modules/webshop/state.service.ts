import { Injectable, OnDestroy } from '@angular/core';
import { IProduct } from './products';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

export interface ICart {
  products: IProduct[];
  total: number;
}

@Injectable()
export class StateService implements OnDestroy {

  public cart$ = new BehaviorSubject<ICart>(null);

  private stop$ = new Subject<void>();

  constructor() {
    this.cart$.pipe(
      takeUntil(this.stop$),
      map(cart => JSON.stringify(cart))
    ).subscribe( cart => localStorage.setItem('cart', cart) );

    this.getInitialCart();
  }

  public getInitialCart() {
    let currentCart: ICart = JSON.parse(localStorage.getItem('cart'));

    if ( !currentCart ) {
      currentCart = {
        products: [],
        total: 0
      };
    }

    this.cart$.next(currentCart);
  }

  public addToCart(product: IProduct) {
    const currentCart = this.cart$.value;

    const newProducts: IProduct[] = [...currentCart.products, product];

    const newTotal = this.calculateCartTotal(newProducts);

    const newCart: ICart = {
      products: newProducts,
      total: newTotal
    };

    this.cart$.next(newCart);
  }

  private calculateCartTotal(products: IProduct[]): number {
    const total = products
      .map( prod => prod.price )
      .reduce((a, b) => a + b, 0);

    return total;
  }

  ngOnDestroy(): void {
    this.stop$.next();
  }

}
