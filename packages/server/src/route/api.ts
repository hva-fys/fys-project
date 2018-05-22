import * as express from 'express';
import * as env from "../environment";
import { first } from 'lodash';
import { flightInformation, products } from '../data/mock-data';

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

    router.get('/products/list', (req, res) => {
        res.json(products);
    })

    return router;
};
