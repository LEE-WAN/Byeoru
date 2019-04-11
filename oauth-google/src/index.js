// load environment variables
require('dotenv').config();

const http = require('http');
const LF = require('logicflow');
const logger = require('./lib/logger');
const route = require('./route.js');

// Logics
const timechk = require('./lib/logics/timechk');
const bodychk = require('./lib/logics/bodychk');
const sendRes = require('./lib/logics/sendRes');
const msgchk = require('./lib/logics/msgchk');

const errHandler = require('./lib/logics/errHandler');
// Logics
require('./lib/database');

// make LogicFlow
const logic = new LF();
logic.register(timechk);
logic.register(bodychk);
logic.register(msgchk);
logic.register(route);
logic.register(sendRes);

logic.registerErr(errHandler);
logic.registerErr(sendRes);
// make LogicFlow

// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
http.createServer((req, response) => {
  const data = [];

  req.on(
    'data', (chunk) => { data.push(chunk); },
  ).on('end', async () => {
    const clientLogic = new LF(logic);

    const store = {
      client: {
        headers: req.headers,
        method: req.method,
        body: Buffer.concat(data).toString(),
      },
      res: {
        statusCode: 200,
        body: {},
      },
      response,
      errMsg: '',
      errCode: 400,
      logger,
    };

    clientLogic.start(store);
  });
}).listen(process.env.PORT || 8000, '0.0.0.0');

logger.info(`${process.env.WHOAMI} REST API Server is started at ${process.env.PORT || 8000} port`);

// Handle Unexpected error
process.on('uncaughtException', (err) => {
  logger.error(err.stack);
});
