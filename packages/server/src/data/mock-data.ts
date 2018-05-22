import { FlightInformation } from '../../../shared/fys-types';

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