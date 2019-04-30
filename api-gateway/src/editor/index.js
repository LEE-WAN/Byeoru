/* eslint-disable no-unused-vars */
const Router = require('koa-router');
const options = require('./options');
const { send } = require('../lib/message');

const router = new Router();


router.get('/', async (ctx, next) => {
  next();
});

router.get('/:type', async (ctx, next) => {
  if (options[ctx.params.type] === undefined) ctx.throw(404);
  ctx.body = options[ctx.params.type];
  next();
});

module.exports = router;
