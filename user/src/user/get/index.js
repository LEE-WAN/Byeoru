const database = require('../../lib/database');

const get = async (store) => {
  const { client, res } = store;
  const col = await database.db.collection('user');

  const info = Object.entries(client.body.content)
    .filter(x => ['userId', 'googleId', 'name', 'nickname']
      .indexOf(x[0]) !== -1);

  let result = null;

  if (info.length !== 0) {
    const query = info[0][1];
    const search = {};
    search[info[0][0]] = query;
    result = await col.findOne(search);
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
    store.logger.info(`Query : [${info[0]}]`);
  }
};
module.exports = get;
