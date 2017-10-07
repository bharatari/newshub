require('dotenv').config();

const Koa = require('koa');
const cors = require('kcors');
const body = require('koa-body');
const router = require('koa-router')();
const jwt = require('koa-jwt');
const path = require('path');
const services = require('./services');
const proxy = require('./services/proxy');

const app = new Koa();
const port = process.env.PORT || 3030;

services(router);

app
  .use(body({
    multipart: true,
  }))
  .use(cors())
  .use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(proxy);

app.listen(port);
