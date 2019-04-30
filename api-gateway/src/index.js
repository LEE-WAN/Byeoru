// load environment variables
require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');

const auth = require('./auth');
const editor = require('./editor');
const logger = require('./lib/logger');

const app = new Koa();
const router = new Router();

const port = process.env.PORT;

app.keys = [process.env.COOKIEKEY1, process.env.COOKIEKEY2];

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

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'This is API Server for Project Byeoru!',
  };
  next();
});

router.use('/auth', auth.routes());
router.use('/editor', editor.routes());

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => {
  logger.info(`${process.env.WHOAMI} server is listening to port ${port}`);
});
