/**
 * LogicFlow에서 사용되게 작성되었음.
 */
const errHandler = async (store, ctx) => {
  store.res.statusCode = store.errCode;
  store.res.body = {
    message: store.errMsg,
    functionNumber: ctx.funcIndex,
  };

  store.logger.error({
    client: store.client,
    functionNumber: ctx.funcIndex,
  });
};
module.exports = errHandler;
