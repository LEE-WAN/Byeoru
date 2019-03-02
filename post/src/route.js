const func = require('./post');

const route = async (store, ctx) => {
  const { body } = store.client;

  if (func[body.type] !== undefined) {
    await func[body.type](store);
  } else {
    store.errMsg = 'Invalid Request Type';
    store.errCode = 400;
    throw new Error('Invalid Request Type');
  }
  await ctx.next();
};

module.exports = route;
