import * as Dotenv from 'dotenv-safe';
import * as Sequelize from 'sequelize';

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
     * Environment constructor.
     *
     * @constructor
     */
    constructor() {
        console.log('Environment constructed');

        Dotenv.load({
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
            SERVER_PORT,
        } = process.env;
    }
}
