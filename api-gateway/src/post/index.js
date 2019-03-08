const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = {
    message: 'APIs for get info of posts',
  };
  next();
});

// router.use('/google', google.routes());

module.exports = router;
