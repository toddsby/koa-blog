const koa = require('koa');
const logger = require('koa-logger');
const route = require('koa-route');
const mysql = require('./mysql');
const app = koa();

const User = require('./models/user');

// logger
app.use(logger());

// x-response-time
app.use(function *(next) {
	const start = new Date;
	yield next;
	const ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
});

// Set Up MySQL Connection
app.use(function* mysqlConnection(next) {
	global.db = yield connectionPool.getConnection();

	yield next;

	global.db.release();
});

app.use(function *() {
	this.body = 'Hello World';

	const user = yield User.get('1');
	console.log(user);
});

app.listen(3000);
console.log('listening');         