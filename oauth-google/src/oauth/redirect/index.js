const { authorizeUrl } = require('../oAuth');

const redirect = async (store) => {
  const { res } = store;
  res.statusCode = 200;
  res.body.url = authorizeUrl;

  return res;
};

module.exports = redirect;
