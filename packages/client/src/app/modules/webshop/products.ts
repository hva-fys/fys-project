export interface IProduct {
  name: string;
  imageUrl: string;
  price: number;
  id: string;
}


export const products: IProduct[] = [
  {
    name: 'Apple watch',
    imageUrl: './assets/images/products/apple-black-watch.png',
    price: 450,
    id: '1222'
  },
  {
    name: 'The fifth',
    imageUrl: './assets/images/products/black-watch.png',
    price: 320,
    id: '123'
  },
  {
    name: 'Daniel willington',
    imageUrl: './assets/images/products/black-women-watch.png',
    price: 300,
    id: '12322'
  },
  {
    name: 'Moto 360 ',
    imageUrl: './assets/images/products/moto-watch.png',
    price: 250,
    id: '1322'
  },
  {
    name: `Rolex Oyster Perpetual`,
    imageUrl: './assets/images/products/rolex-watch.png',
    price: 1000,
    id: '13252'
  },
  {
    name: 'Rolex yacht master',
    imageUrl: './assets/images/products/yacht-master-watch.webp',
    price: 2000,
    id: '11212'
  }
];
