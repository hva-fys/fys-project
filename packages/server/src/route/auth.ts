import * as express from 'express';
import * as env from "../environment";

/**
 * Auth route segment.
 *
 * @param {Environment} Environment
 *
 * @returns {Router}
 */
module.exports = (Environment: env.Environment) => {
    const router = express.Router();

    return router;
};
