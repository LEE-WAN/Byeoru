// load environment variables
require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');

const auth = require('./auth');

const app = new Koa();
const router = new Router();

const port = 3000;

router.get('/', (ctx, next) => {
  console.log('/');
  ctx.body = 'Very Very Test Server for Byeoru project';
  next();
});

router.use('/auth', auth.routes());

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => {
  console.log(`RENDERER server is listening to port ${port}`);
});
