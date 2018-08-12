const Koa = require('koa');
const cors = require('kcors');
const body = require('koa-body');
const router = require('koa-router')();
const error = require('koa-json-error');
const path = require('path');
const services = require('./services');

const app = new Koa();

services(router);

const errorOptions = {
  postFormat: (e, obj) => process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj,
};

app
  .use(body({
    multipart: false,
  }))
  .use(error(errorOptions))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
