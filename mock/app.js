// 'user strict';

// const Koa = require('koa');
// const path = require('path');
// const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
// const session = require('koa-session-minimal');
// const app = new Koa();
// const router = new Router();
// const PATH = '../mock_file';

// app.use(bodyParser())
//    .use(session({
//    	key: 'SESSION_ID',
//    	cookie: {
//    		domain: 'localhost',
//    		path: '/',
//    		maxAge: 10 * 60 * 6000,
//    		httpOnly: true,
//    		overwrite: false,
//    		secure: false,
//    	}
//    }));

// app.use(router.routes())
//    .use(router.allowedMethods());

// app.use(async (ctx, next) => {
// 	const start = new Date();
// 	await next();
// 	const ms = new Date() - start;
// 	ctx.set('X-Response-Time', `${ms}ms`);
// });

// app.use(async (ctx, next) => {
// 	const start = new Date();
// 	await next();
// 	const ms = new Date() - start;
// 	console.log(`${ctx.url}--${ctx.method}--${ms}ms`);
// });

// app.use(ctx => {
// 	const staticPath = path.join(__dirname, PATH);
// 	const reqPath = path.join(staticPath, ctx.path);
// 	const file = require(reqPath);
// 	ctx.body = file;
// });

// app.listen(8080);

/*
'user strict'

const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const views = require('koa-views');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const path = require('path');

const staticPath = '../mock_file';

const app = new Koa();
const router = new Router();

// app.use(bodyParser());

app.use(convert(
  static(
    path.join(__dirname, './static/image')
  )
));

app.use(views(
  path.join(__dirname, './view'), {
    extension: 'ejs'
  }
));

app.use(router.routes())
   .use(router.allowedMethods())
   .use(session({
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

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`ctx.method: ${ctx.method}`);
  console.log(`ctx.url: ${ctx.url}`);
  console.log(`x-response-time: ${ms}ms`);
});

app.use(async (ctx, next) => {
  const sum = (+ctx.cookies.get('requests') || 0) + 1;
  ctx.cookies.set('requests', sum);
  if (ctx.url === '/config/uploadfiles') {
    next();
    return;
  }
  const pathName = ctx.path;
  const reqPath = path.join(__dirname, staticPath, pathName);
  const result = require(reqPath);
  ctx.body = result;
});

const getBodyParser = (ctx) => {
  let bodyParser = '';
  return new Promise((resolve, reject) => {
    try {
      ctx.req.addListener('data', (data) => {
        bodyParser += data;
      });
      ctx.req.addListener('end', () => {
        return resolve(bodyParser);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

router.post('/config/uploadfiles', async ctx => {
  const pathName = ctx.path;
  const reqPath = path.join(__dirname, staticPath, pathName);
  const result = require(reqPath);
  const body = await getBodyParser(ctx);
  console.log(body);
  ctx.body = result;
});


app.listen(8080);
console.log('server at localhost 8080');
*/


const Koa = require('koa');
const static = require('koa-static');
const convert = require('koa-convert');
const views = require('koa-views');
const path = require('path');
const app = new Koa()
// const bodyParser = require('koa-bodyparser')

const { uploadFile } = require('./util/upload')

// app.use(bodyParser())
app.use(views(path.join(__dirname, './view/')), {
  extension: 'ejs'
});

app.use(static(path.join(__dirname, './static/')));

app.use( async ( ctx, next ) => {
  console.log(ctx.url)
  if (ctx.url === "/") {
    // 当GET请求时候返回表单页面
    await next();
    await ctx.render('index.ejs');

  } else if ( ctx.url === '/config/uploadfiles' && ctx.method === 'POST' ) {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, './static' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })

    ctx.body = result
  }
})
// app.use(async (ctx, next) => {

//   await next();
//   ctx.render('jquery.min.js');
// })
app.listen(8080, () => {
  console.log('[demo] upload-simple is starting at port 8080')
})






/**
 * Module dependencies.
 */




// const logger = require('koa-logger');
// const convert = require('koa-convert');
// const views = require('koa-views');
// const static = require('koa-static');
// const koaBody = require('koa-body');
// const Koa = require('koa');
// const fs = require('fs');
// const app = new Koa();
// const os = require('os');
// const path = require('path');

// // log requests

// // app.use(logger());

// app.use(koaBody({ multipart: true }));

// app.use(convert(static(
//   path.join(__dirname, './static')
// )));

// app.use(views(path.join(__dirname, './view/'), {
//   extension: 'ejs'
// }));

// app.use(async function(ctx, next) {
//   if (ctx.method === 'GET') {
//     await ctx.render('index')
//   };
//   await next();
// });

// // handle uploads

// app.use(async function(ctx, next) {
//   // ignore non-POSTs
//   if ('POST' != ctx.method) return await next();

//   const files = ctx.request.body.files;
//   // const reader = fs.createReadStream(files.path);
//   // const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
//   // reader.pipe(stream);
//   console.log('uploading %s -> %s', files);

//   ctx.body = {
//     resultData: {
//       success: true
//     }
//   };
// });

// // listen

// app.listen(8080);
// console.log('listening on port 8080');
