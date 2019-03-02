const database = require('../../lib/database');

const add = async (store) => {
  const { client, res } = store;

  const user = {};

  const {
    name, googleId, email, image, nickname, oauth,
  } = client.body.content;

  // TODO: Typecheck 넣어두기
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

  const col = await database.db.collection('user');
  const result = await col.findOne({
    $or: [
      { googleId },
      { name },
    ],
  });
  if (result) {
    store.errMsg = 'Duplicated user infomation';
    store.errCode = 403;
    throw new Error('Duplicated user infomation');
  }

  user.userId = await database.getNextCount('userId');
  user.date = new Date();
  col.insertOne(user);

  res.statusCode = 200;
  res.body = user;
  store.logger.info(`user added: ${JSON.stringify(user)}`);
};

module.exports = add;
