const request = require('request-promise-native');

const from = process.env.WHOAMI;

/**
 * Send msg and get answer
 * !warn! error throwable
 * !warn! bad status code will throw errer
 * @param {string} to to who?
 * @param {string} type for what?
 * @param {*} content additional info.
 * @returns {*} response json object
 */
const send = async (to, type, content) => {
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
      from, to, type, content,
    },
    json: true,
  });
  return result;
};

const chkMsg = (body) => {
  if (!Object.prototype.hasOwnProperty.call(body, 'from')
  || !Object.prototype.hasOwnProperty.call(body, 'to')
  || !Object.prototype.hasOwnProperty.call(body, 'type')
  || !Object.prototype.hasOwnProperty.call(body, 'content')) return true;
  return false;
};

module.exports = { send, chkMsg };
