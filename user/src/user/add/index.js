const logger = require('../../lib/logger');
const database = require('../../lib/database');
const { send } = require('../../lib/message');

const add = async (client) => {
  const res = {
    statusCode: 400,
    body: {},
  };

  const user = {};

  const {
    name, googleId, email, image, nickname, oauth,
  } = client.body;

  if (name && email && (googleId)) {
    user.name = name;
    user.googleId = googleId;
    user.email = email;
    user.image = image || 'default';
    user.nickname = nickname || name;
    user.oauth = oauth || {};
  } else {
    res.statusCode = 400;
    res.body = {
      message: 'Invalid request',
    };
    logger.error(JSON.stringify({ msg: 'INVALID REQUEST', ...client }));
    return res;
  }

  res.body = await database.getNextCount('userId');

  return res;
};

module.exports = add;
