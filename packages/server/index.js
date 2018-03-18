require('ts-node/register');

const Environment = require('./src/environment').Environment;

const env = new Environment();
if(env) {
  env.run();
}
