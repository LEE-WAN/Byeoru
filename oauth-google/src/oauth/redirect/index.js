const logger = require('../../lib/logger');
const { authorizeUrl } = require('../oAuth');

const redirect = async (client) => {
  const res = {
    statusCode: 200,
    body: { url: authorizeUrl },
  };
  logger.info(JSON.stringify({ msg: 'URL REQUEST', ...client }));
  return res;
};

module.exports = redirect;
