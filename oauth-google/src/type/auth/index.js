const { code2Info } = require('../oAuth');
const { send } = require('../../lib/message');

const auth = async (store) => {
  const { client, res } = store;
  let info = {};
  let userData = {};
  const { code } = client.body.content;

  if (!code) {
    store.errMsg = 'Invalid request';
    store.errCode = 400;
    throw new Error(store.errMsg);
  }

  try {
    info = await code2Info(code);
    info = JSON.parse(info);
  } catch (e) {
    store.errMsg = 'Invalid google code';
    store.errCode = 400;
    throw new Error(store.errMsg);
  }
  store.logger.info(JSON.stringify({ msg: 'LOGIN REQUEST', info }));

  store.statusCode = 200;
  store.res.body = { googleId: info.id };

  /*
  // TODO: USER랑 연계해서 user_id 따와야함
  try {
    userData = await send('USER', 'get', { googleId: info.id });
    store.statusCode = 200;
    res.body = userData;
    store.logger.info(`id ${userData.userId} is logined`);
    return;
  } catch (err) {
    // 404면 유저를 찾을수 없다는뜻. => 회원가입
    // 404가 아니면 서비스문제
    if (err.statusCode !== 404) {
      store.errMsg = 'Internal Service Error';
      store.errCode = 500;
      throw new Error(store.errMsg);
    }
  }

  try {
    userData = {
      name: info.name,
      email: info.email,
      googleId: info.id,
      image: info.picture,
      nickname: info.name,
      oauth: info,
    };
    userData = await send('USER', 'add', userData);
    userData.newUser = true;

    store.statusCode = 200;
    res.body = userData;
    store.logger.info(`id ${userData.userId} is registered`);
  } catch (err) {
    store.errMsg = 'Internal Service Error';
    store.errCode = 500;
    throw new Error(store.errMsg);
  }
  */
};

module.exports = auth;
