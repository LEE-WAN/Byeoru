const Router = require('koa-router');
const { send } = require('../../lib/message');

const router = new Router();

// https://backend-intro.vlpt.us/4/
// JWT에 대해 알아보기!
router.get('/', async (ctx, next) => {
  const { url } = await send('oauthgoogle', 'redirect', {});

  const { code } = ctx.request.query;

  if (code) {
    ctx.response.body = await send('oauthgoogle', 'auth', { code });
  } else {
    ctx.response.redirect(url);
  }
  next();
});

module.exports = router;
