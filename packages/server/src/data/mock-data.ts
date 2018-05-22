import { FlightInformation, Webshop } from '../../../shared/fys-types';

export const flightInformation: FlightInformation.IFlight[] = [
    {
        start: {
            latitude: "34.052234",
            longitude: "-118.243685",
            name: "Los Angeles",
            shortHand: "LA"
        },
        end: {
            latitude: "21.3069444",
            longitude: "-157.8583333",
            name: "Honolulu",
            shortHand: "HI"
        },
        flightNumber: 'N269HV'
    },
    {
        start: {
            latitude: "40.730610",
            longitude: "-73.935242",
            name: "New york",
            shortHand: "NY"
        },
        end: {
            latitude: "28.396837",
            longitude: "-80.605659",
            name: "Cape Canaveral",
            shortHand: "CC"
        },
        flightNumber: 'N46391'
    }
];


export const products: Webshop.IProduct[] = [
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