/**
 * LogicFlow에서 사용되게 작성되었음.
 */
const sendRes = async (store, ctx) => {
  const { res, response } = store;
  try {
    response.writeHead(res.statusCode, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(res.body));
    response.end();
    if (!store.errCode) await ctx.next();
  } catch (err) {
    store.errMsg = 'Fail to respond';
    store.errCode = 500;
    throw err;
  }
};
module.exports = sendRes;
