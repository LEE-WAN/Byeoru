const database = require('../../lib/database');
const { send } = require('../../lib/message');

const add = async (store) => {
  const { client, res } = store;

  const {
    title, category, tags, content, meta, link,
  } = client.body.content;
  let { auth } = client.body;

  const post = {};

  // 검증
  if (title && category && tags && content && auth) {
    post.title = title;
    post.userId = auth.userId;
    post.tags = tags || [];
    post.content = content;
    post.link = link || title;
    post.meta = meta || {
      title,
      abstract: content.slice(0, 200),
      thumbnail: 'default',
    };
  } else {
    store.errMsg = 'Invalid post add format';
    store.errCode = 400;
    throw Error(store.errMsg);
  }

  // 인증
  try {
    auth = await send('USER', 'get', auth);
  } catch (err) {
    if (err.statusCode === 404) {
      store.errMsg = 'Unauthorized access';
      store.errCode = 401;
    } else {
      store.errMsg = 'Internal Service Error';
      store.errCode = 500;
    }
    throw err;
  }

  // DB 연결
  const col = await database.db.collection('post');

  // 중복확인
  const result = await col.findOne({
    $or: [
      { title: post.title },
      { link: post.link, userId: post.userId },
    ],
  });
  if (result) {
    store.errCode = 400;
    if (result.title === post.title) store.errMsg = 'Duplicated title';
    else if (result.link === post.link) store.errMsg = 'Duplicated link';
    throw new Error(store.errMsg);
  }

  post.postId = await database.getNextCount('postId');
  post.date = new Date();

  await col.insertOne(post);

  res.statusCode = 200;
  res.body = {
    postId: post.postId,
    path: `/@${auth.name}/${post.link}`,
  };
};

module.exports = add;
