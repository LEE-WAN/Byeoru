const request = require('request-promise-native');

const from = process.env.WHOAMI;

/**
 * Send msg and get answer
 * !warn! error throwable
 * !warn! bad status code will throw errer
 * @param {string} to to whom?
 * @param {string} type for what?
 * @param {*} content additional info.
 * @param {object} auth auth
 * @returns {*} response json object
 */
const send = async (to, type, content, auth = {}) => {
  let result = {
    statusCode: 500,
    headers: {},
    body: {},
  };

  const url = process.env[`ADDRESS_${to.toUpperCase()}`];
  if (url === undefined) throw new Error(`ADDRESS FOR ${to} IS NOT PROVIDED.`);

  result = await request({
    uri: url,
    body: {
      from, to, type, content, auth,
    },
    json: true,
  });
  return result;
};

module.exports = { send };
