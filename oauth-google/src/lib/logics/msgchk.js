const isMsg = (body) => {
  if (Object.prototype.hasOwnProperty.call(body, 'from')
  && Object.prototype.hasOwnProperty.call(body, 'to')
  && Object.prototype.hasOwnProperty.call(body, 'type')
  && Object.prototype.hasOwnProperty.call(body, 'content')) return true;
  return false;
};

/**
 * LogicFlow에서 사용되게 작성되었음.
 */
const msgchk = async (store, ctx) => {
  if (isMsg(store.client.body)) {
    await ctx.next();
  } else {
    store.errMsg = 'Invalid message format';
    store.errCode = 400;
    throw new Error('Invalid message format');
  }
};
module.exports = msgchk;
