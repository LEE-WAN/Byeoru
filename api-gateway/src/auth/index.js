const Router = require('koa-router');

const router = new Router();
const google = require('./google');

router.get('/', (ctx, next) => {
  console.log('/auth');
  ctx.body = 'Auth';
  next();
});

router.use('/google', google.routes());

module.exports = router;
