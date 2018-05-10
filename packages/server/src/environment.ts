import * as dotenv from 'dotenv-safe';
import {Sequelize} from 'sequelize-typescript';
import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as socketio from "socket.io";
import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import {TicTacToe} from './sockets/tic-tac-toe';
import { last } from 'lodash';

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
    private _models = [];

    /**
     * All express routes.
     *
     */
    private _routes: { [key: string]: any } = {};

    /**
     * Express instance.
     */
    private _app: express.Application;

    /**
     * Http instance.
     */
    private _http: http.Server;

    /**
     * Sequelize instance.
     */
    private _sequelize: Sequelize;

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

        const sequelize = new Sequelize({
            database: SEQUALIZE_NAME,
            dialect: SEQUALIZE_DIALECT,
            username: SEQUALIZE_USER,
            password: SEQUALIZE_PASSWORD,
            modelPaths: [
                __dirname + '/model'
            ],
            operatorsAliases: false,
        });

        await sequelize.authenticate().then(() => {
            console.log('Loading sequelize completed.');

            if (SEQUALIZE_SYNC) {
                sequelize.sync({force: true}).then(() => {
                    console.log('Loading model sync completed.');
                }).catch((e: any) => {
                    console.error('Error model sync', e);
                    process.exit(1);
                });
            }

            this._sequelize = sequelize;
        }).catch((e: any) => {
            console.error('Error sequelize', e.message);
            // process.exit(1);
        });

        const app = express();
        if (app) {
            app.disable('x-powered-by');

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true,
            }));

            app.use('/', express.static('public'));

            const files = fs.readdirSync(__dirname + '/route')
                .map(fileName => path.join(__dirname + '/route', fileName));


            const routes: { [key: string]: any } = {};

            files.filter(file => _.endsWith(file, '.ts'))
                .forEach(file => {

                    const name = last(file.substr(0, file.length - 3).split('/'));

                    const route = require(file)(this);

                    if (route) {
                        app.use(`/${name}`, route);
                        routes[name] = route;
                    }
            
            });

            this._routes = routes;
        

            app.get('*', (req, res) => {
                res.sendFile(path.resolve('public/index.html'));
            });
         
            this._app = app;

            console.log('Loading express completed.');
        }

        const httpInstance = await new http.Server(this._app);

        const socket = socketio(httpInstance);

        new TicTacToe(socket);

        if (httpInstance) {
            httpInstance.listen(parseInt(SERVER_PORT) || 8080, SERVER_HOST || '0.0.0.0', () => {
                console.log(`Listening on ${SERVER_HOST}:${SERVER_PORT}`);
            });

            this._http = httpInstance;
        }
    }
}
