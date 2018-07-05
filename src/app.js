const Koa = require('koa');
const cors = require('kcors');
const body = require('koa-body');
const router = require('koa-router')();
const jwt = require('koa-jwt');
const error = require('koa-json-error');
const path = require('path');
const services = require('./services');
const proxy = require('./services/proxy');
const _ = require('lodash');

const app = new Koa();

services(router);

const errorOptions = {
  postFormat: (e, obj) => process.env.NODE_ENV === 'production' ? _.omit(obj, 'stack') : obj,
};

app
  .use(body({
    multipart: true,
  }))
  .use(error(errorOptions))
  .use(cors())
  .use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(proxy);

module.exports = app;
