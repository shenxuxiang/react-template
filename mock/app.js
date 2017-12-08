'user strict';

const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-minimal');
const app = new Koa();
const router = new Router();
const PATH = '../mock_file';

app.use(bodyParser())
   .use(session({
   	key: 'SESSION_ID',
   	cookie: {
   		domain: 'localhost',
   		path: '/',
   		maxAge: 10 * 60 * 6000,
   		httpOnly: true,
   		overwrite: false,
   		secure: false,
   	}
   }));

app.use(router.routes())
   .use(router.allowedMethods());

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
	console.log(`${ctx.url}--${ctx.method}--${ms}ms`);
});

app.use(ctx => {
	const staticPath = path.join(__dirname, PATH);
	const reqPath = path.join(staticPath, ctx.path);
	const file = require(reqPath);
	ctx.body = file;
});

app.listen(8080);
