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

    router.get('/getAudioContent', function (req, res) {
        return res.json({
            name: 'The lion king',
        });
    });

    return router;
};
