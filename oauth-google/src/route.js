const logger = require('./lib/logger');
const func = require('./oauth');
const { chkMsg } = require('./lib/message');

const route = (client) => {
  let res = {
    statusCode: 400,
    body: {},
  };
  const { body } = client;
  if (chkMsg(body)) {
    res.body.message = 'Invalid message format';
    logger.error(`${JSON.stringify({ msg: 'INVALID MESSAGE FORMAT', ...client })}`);
    return res;
  }
  if (func[body.type] !== undefined) {
    res = func[body.type](client);
  } else {
    res.body.message = 'Invalid request type';
    logger.error(`${JSON.stringify({ msg: 'INVALID REQUEST TYPE', ...client })}`);
  }
  return res;
};

module.exports = route;
