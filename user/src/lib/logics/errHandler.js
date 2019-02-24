/**
 * LogicFlow에서 사용되게 작성되었음.
 */
const errHandler = async (store, ctx) => {
  store.res.statusCode = store.errCode || 500;
  store.res.body = {
    message: store.errMsg || 'Internal Server Error',
    functionNumber: ctx.funcIndex,
  };

  store.logger.error(JSON.stringify({
    client: store.client,
    error: store.error.stack,
    message: store.errMsg || 'Unhandled',
    functionNumber: ctx.funcIndex,
  }));
};
module.exports = errHandler;
