const logger = require('../../lib/logger');
const db = require('../../lib/database');
const { send } = require('../../lib/message');

const add = async (client) => {
  const res = {
    statusCode: 400,
    body: {},
  };

  const post = {
    title: '',
    author: 1,
    post_id: 1,
    date: {
      created: new Date(),
      lastModified: new Date(),
    },
    tags: {
      article_type: [],
      article_about: [],
      article_unique: [],
    },
    content: '',
    meta: {
      title: '',
      abstract: '',
      thumbnail: '',
    },
  };
  // TODO: USER 완성하고 여기서부터 시작
  try {
    console.log(await send('user', 'hello', post));
  } catch (e) {
    logger.error(JSON.stringify({ msg: e.toString(), ...client }));
  }

  return res;
};

module.exports = add;
