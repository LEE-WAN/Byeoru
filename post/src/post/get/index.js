const database = require('../../lib/database');
const { send } = require('../../lib/message');

const get = async (store) => {
  const { client, res } = store;
  const { postId, link } = client.body;
  const col = await database.db.collection('post');

  let result = null;

  if (postId) {
    result = await col.findOne({ postId });
  } else if (link) {
    link.split('/');
  }
};

module.exports = get;
