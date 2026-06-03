const serverlessExpress = require('@codegenie/serverless-express');
const app = require('./index.js');

export.handler = serverlessExpress(app);