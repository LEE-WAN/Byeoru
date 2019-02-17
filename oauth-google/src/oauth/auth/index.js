const logger = require('../../lib/logger');
const { code2Info } = require('../oAuth');

const auth = async (client) => {
  const res = {
    statusCode: 200,
    body: { },
  };
  let info = {};
  const { code } = client.body.content;

  if (code) {
    try {
      info = await code2Info(code);
    } catch (e) {
      logger.error(JSON.stringify({
        msg: e.toString(),
        ...client,
      }));
      res.statusCode = 400;
      res.body = {
        message: 'Invalid code',
      };
      return res;
    }
    logger.info(JSON.stringify({ msg: 'LOGIN REQUEST', ...client }));
    // TODO: USER랑 연계해서 user_id 따와야함
    res.body = info;
  } else {
    res.statusCode = 400;
    res.body = {
      message: 'Invalid request',
    };
  }
  return res;
};

module.exports = auth;
