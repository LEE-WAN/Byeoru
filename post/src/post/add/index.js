const database = require('../../lib/database');
const { send } = require('../../lib/message');

const add = async (store) => {
  const { client, res } = store;

  const {
    title, tags, content, meta, link,
  } = client.body.content;
  let { auth } = client.body.content;

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
    throw Error(store.errMsg);
  }

  const post = {};

  // 검증
  if (title && tags && content) {
    post.title = title;
    post.userId = auth.userId;
    post.tags = {};
    post.tags.genre = tags.genre;
    post.tags.about = tags.about;
    post.tags.hash = tags.hash;
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

  const col = await database.db.collection('post');
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
