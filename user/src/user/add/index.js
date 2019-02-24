const database = require('../../lib/database');

const add = async (store) => {
  const { client, res } = store;

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
    store.errMsg = 'Invalid user add format';
    store.errCode = 400;
    throw Error('Invalid user add format');
  }

  res.body = await database.getNextCount('userId');
};

module.exports = async (store) => {
  try {
    await add(store);
  } catch (err) {
    store.errMsg = 'Internal Server Error';
    store.errCode = 500;
    throw err;
  }
};
