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
  const clientLogic = new LF(logic);
  const data = [];
  const store = {
    client: {},
    res: {
      statusCode: 200,
      body: {},
    },
    response,
    errMsg: '',
    errCode: 400,
    logger,
  };

  req.on(
    'data', (chunk) => { data.push(chunk); },
  ).on('end', async () => {
    // all the infomation that can be used
    store.client = {
      headers: req.headers,
      method: req.method,
      body: Buffer.concat(data).toString(),
    };
    clientLogic.start(store);
    // logic to proccess
    // const result = await route(client);
  });
}).listen(8001, '0.0.0.0');

logger.info('USER REST API Server is started at 8001 port');
