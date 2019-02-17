// load environment variables
require('dotenv').config();

const http = require('http');
const logger = require('./lib/logger');
const route = require('./route.js');
require('./lib/database');

// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
http.createServer((req, res) => {
  const data = [];
  req.on(
    'data', (chunk) => { data.push(chunk); },
  ).on('end', async () => {
    // all the infomation that can be used
    const client = {
      headers: req.headers,
      method: req.method,
      body: Buffer.concat(data).toString(),
    };

    // JSONing
    try {
      client.body = JSON.parse(data);
    } catch (err) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Invalid json request' }));
      logger.error(`${JSON.stringify({ msg: 'NONJSON REQUEST', ...client })}`);
      return;
    }

    // logic to proccess
    const result = await route(client);
    res.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result.body));
    res.end();
  });
}).listen(8000, '0.0.0.0');

logger.info('Post REST API Server is started at 8000 port');
/**
process.on('uncaughtException', (err) => {
  // 예상치 못한 예외 처리
  logger.error(err.stack);
});

 */
