import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../../animations';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';

interface IProduct {
  name: string;
  imageUrl: string;
  price: number;
}

@Component({
  selector: 'fys-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [fadeInOut]
})
export class ProductListComponent implements OnInit {


  public category = 'Watches';

  public products: IProduct[] = [
    {
      name: 'Apple watch',
      imageUrl: './assets/images/products/apple-black-watch.png',
      price: 450
    },
    {
      name: 'The fifth',
      imageUrl: './assets/images/products/black-watch.png',
      price: 320
    },
    {
      name: 'Daniel willington',
      imageUrl: './assets/images/products/black-women-watch.png',
      price: 300
    },
    {
      name: 'Moto 360 ',
      imageUrl: './assets/images/products/moto-watch.png',
      price: 250
    },
    {
      name: `Rolex Oyster Perpetual`,
      imageUrl: './assets/images/products/rolex-watch.png',
      price: 1000
    },
    {
      name: 'Rolex yacht master',
      imageUrl: './assets/images/products/yacht-master-watch.webp',
      price: 2000
    }
  ];

  public prices: number[] = Array(10).fill(null).map( (el, index) => (index + 1) * 100 );

  constructor(private _builder: AnimationBuilder) { }

  ngOnInit() {
  }

}
