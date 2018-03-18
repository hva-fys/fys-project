import * as dotenv from 'dotenv-safe';
import * as sequelize from 'sequelize';
import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as socketio from "socket.io";
import * as _ from 'lodash';
import * as fs from 'fs';

/**
 * Environment.
 */
export class Environment {
    /**
     * All sequelize models.
     *
     * @type {any[]}
     * @private
     */
    private _models: any = [];

    /**
     * All express routes.
     *
     * @type {any[]}
     * @private
     */
    private _routes: any = [];

    /**
     * Express instance.
     */
    private _app: express.Application;

    /**
     * Http instance.
     */
    private _http: http.Server;

    /**
     * Environment constructor.
     *
     * @constructor
     */
    constructor() {
        console.log('Environment constructed');

        dotenv.load({
            encoding: 'utf8',
            path: '.env.example',
        });
    }

    /**
     * Run environment.
     */
    async run() {
        const {
            SEQUALIZE_SYNC,
            SEQUALIZE_NAME,
            SEQUALIZE_USER,
            SEQUALIZE_PASSWORD,
            SEQUALIZE_DIALECT,
            SEQUALIZE_PORT,
            SEQUALIZE_HOST,
            SERVER_HOST,
            SERVER_PORT,
        } = process.env;

        const app = await express();
        if (app) {
            app.disable('x-powered-by');

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true,
            }));

            app.use('/', express.static('public'));

            try {
                const paths = fs.readdir(__dirname + '/route', (err, files) => {
                    if (!_.isEmpty(files)) {
                        const routes: any = {};

                        _.forEach(files, (file) => {
                            if (_.endsWith(file, '.ts')) {
                                const name = _.toString(file.substr(0, file.length - 3));

                                const route = require(`${__dirname}/route/${file}`)(this);
                                if (route) {
                                    app.use(`/${name}`, route);

                                    console.log(`Loading route '${name}' completed.`);

                                    routes[name] = route;
                                }
                            }
                        });

                        this._routes = routes;
                    }
                })
            }
            catch (e) {
                console.error('Error route', e.message);
            }

            this._app = app;

            console.log('Loading express completed.');
        }

        const socket = await socketio(http);
        if (socket) {

        }

        const pHttp = await new http.Server(this._app);
        if (pHttp) {
            pHttp.listen(parseInt(SERVER_PORT) || 8080, SERVER_HOST || '0.0.0.0', () => console.log('Listening on %s:%d', SERVER_HOST, SERVER_PORT));

            this._http = pHttp;
        }
    }
}
