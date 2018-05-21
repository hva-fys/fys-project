import * as express from 'express';
import * as env from "../environment";
import { first } from 'lodash';
import { FlightInformation } from '../../../shared/fys-types';

const flightInformation: FlightInformation.IFlight[] = [
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

/**
 * Auth route segment.
 *
 * @param {Environment} Environment
 *
 * @returns {Router}
 */
module.exports = (Environment: env.Environment) => {
    const router = express.Router();

    router.all('/*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    router.get('/getAudioContent', function (req, res) {
        return res.json({
            name: 'The lion king',
        });
    });

    router.get('/flight-info', (req, res) => {
        const randomFlight = first(flightInformation);

        res.json(randomFlight);
    });

    return router;
};
