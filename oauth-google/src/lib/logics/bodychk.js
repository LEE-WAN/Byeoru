/**
 * LogicFlow에서 사용되게 작성되었음.
 */
const bodychk = async (store, ctx) => {
  try {
    store.client.body = JSON.parse(store.client.body);
    await ctx.next();
  } catch (err) {
    store.errMsg = 'Non-JSON Request';
    store.errCode = 400;
    throw err;
  }
};
module.exports = bodychk;
