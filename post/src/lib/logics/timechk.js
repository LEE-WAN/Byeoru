/**
 * LogicFlow에서 사용되게 작성되었음.
 */
const timechk = async (store, ctx) => {
  const start = new Date();
  await ctx.next();
  const time = new Date() - start;
  store.logger.debug(`Proccessing time: ${time}ms`);
};
module.exports = timechk;
