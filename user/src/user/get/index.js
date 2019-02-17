const logger = require('../../lib/logger');
const database = require('../../lib/database');
const { send } = require('../../lib/message');

const add = async (client) => {
  const col = await database.db.collection('user');
  const res = {
    statusCode: 400,
    body: {},
  };
  const { userId, googleId } = client.body.content;

  let result = null;
  if (userId) {
    result = await col.findOne({
      userId,
    });
  } else if (googleId) {
    result = await col.findOne({
      googleId,
    });
  } else {
    res.body.message = 'INVALID USER REQUEST';
    logger.error(JSON.stringify({ msg: 'INVALID USER REQUEST', ...client }));
    return res;
  }

  if (!result) {
    res.statusCode = 404;
    res.body.message = 'USER NOT FOUND';
  } else {
    res.statusCode = 200;
    res.body = result;
    logger.info(`id: ${userId}`);
  }

  return res;
};

module.exports = add;
