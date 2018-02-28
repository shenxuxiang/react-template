const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session-minimal');
const views = require('koa-views');
const convert = require('koa-convert');
const static =require('koa-static');
const path = require('path');

const parserBody = require('./util/postbody');
const uploadFile = require('./util/upload');
const db = require('./models/dbs');

const app = new Koa();
const router = new Router();

app.use(session({
  key: 'SESSION_ID',
  cookie: {
    domain: 'localhost',
    path: '/',
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    overwrite: false,
    secure: false
  }
}));

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}));

app.use(convert(static(path.join(__dirname, './static'))))
   .use(router.routes())
   .use(router.allowedMethods());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});


app.use(async (ctx, next) => {
  const n = +ctx.cookies.get('session_id') || 0;
  await next();
  ctx.cookies.set('session_id', n);
});


router.post('/config/updatename', async (ctx, next) => {
  const query = await parserBody(ctx);
  console.log(query);
  ctx.body = query;
});

router.post('/config/uploadfiles', async (ctx, next) => {
  const storagePath = path.join(__dirname, '/static/images');
  const result = await uploadFile(ctx, storagePath);
  console.log(result);
  ctx.body = result;
});

router.get('/find', async (ctx, next) => {
  const query = ctx.query;
  const { name, pageSize, pageNum } = query;
  const options = {
    limit: pageSize ? +pageSize : 0,
    skip: pageNum ? ((+pageNum - 1) * +pageSize) : 0,
  };
  const count = await db.count();
  const searchObj = name ? {name} : null;
  const result = await db.find(searchObj, options);
  ctx.body = {
    count,
    result,
  };
});

router.get('/insert', async (ctx, next) => {
  const query = ctx.query;
  const { name, sex, age } = query;
  const doc = await db.find({name});
  let result = '用户已经存在,无法再次创建！！！';
  if (doc && doc.length === 0) {
    result = await db.insert(query);
  }
  ctx.body = result;
});

app.listen(8080, () => {
  console.log('server is start at localhost 8080');
})

