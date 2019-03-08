// load environment variables
require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');

const auth = require('./auth');
const logger = require('./lib/logger');

const app = new Koa();
const router = new Router();

const port = 3000;

// logger
app.use(async (ctx, next) => {
  ctx.logger = logger;
  await next();
  const rt = ctx.response.get('X-Response-Time');
  logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

router.get('/', (ctx, next) => {
  ctx.body = {
    message: 'This is API Server for Project Byeoru!',
  };
  next();
});

router.use('/auth', auth.routes());

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => {
  logger.info(`RENDERER server is listening to port ${port}`);
});
