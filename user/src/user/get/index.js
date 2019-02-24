const database = require('../../lib/database');

const get = async (store) => {
  const { client, res } = store;
  const col = await database.db.collection('user');
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
    store.errMsg = 'Invalid user request format';
    store.errCode = 400;
    throw new Error('Invalid user request format');
  }

  if (!result) {
    store.errMsg = 'User not found';
    store.errCode = 404;
    throw new Error('User not found');
  } else {
    res.statusCode = 200;
    res.body = result;
    store.logger.info(`id: ${result.userId}`);
  }
};
module.exports = async (store) => {
  try {
    await get(store);
  } catch (err) {
    store.errMsg = 'Internal Server Error';
    store.errCode = 500;
    throw err;
  }
};
