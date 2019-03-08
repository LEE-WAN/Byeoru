const database = require('../../lib/database');
const { send } = require('../../lib/message');

const get = async (store) => {
  const { client, res } = store;
  const { postId, link } = client.body.content;
  const col = await database.db.collection('post');

  let result = null;

  if (postId) {
    result = await col.findOne({ postId });
  } else if (link) {
    const path = link.split(/\//g).filter(x => x !== '');

    if (path[0][0] === '@') { // /@이완해/project-byeoru
      path[0] = path[0].slice(1); // @이완해 -> 이완해
      const { userId } = await send('USER', 'get', { name: path[0] });
      result = await col.findOne({
        userId,
        link: path[1],
      });
    } else if (path[0] === 'post') { // /post/1
      result = await col.findOne({ postId: path[1] * 1 });
    }
  }

  if (!result) {
    store.errMsg = 'Post not found';
    store.errCode = 404;
    throw new Error(store.errMsg);
  } else {
    res.statusCode = 200;
    res.body = result;
  }
};

module.exports = get;
