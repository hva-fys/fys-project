require('ts-node/register');

const Environmnet = require('./src/environment').Environment;

const environment = new Environmnet();
environment.run();