# NewsHub Gateway

An API gateway for NewsHub.

# Components

## Services

* [newshub-client](https://github.com/bharatari/newshub-client): NewsHub's client built on React and Redux
* [newshub-client-server](https://github.com/bharatari/newshub-client-server): NewsHub's client server built on Koa
* [newshub-server](https://github.com/bharatari/newshub-server)
* [newshub-gateway](https://github.com/bharatari/newshub-gateway): API gateway
* [newshub-events](https://github.com/bharatari/newshub-events): Events functionality

## Functions

* newshub-email: Email functionality

# Deployment Guide

1. Copy `docker-compose.yml` and `docker-compose.prod.yml` files to remote server
2. Copy `.env` files for each service to remote server
3. Build services locally using `docker-compose build`
4. Tag services with `docker tag gateway_<service> <user>/newshub_<service>`
5. Push services with `docker push <user>/newshub_<service>`
5. On remote server, `docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull`
6. On remote server, run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

# Common Commands

     docker-compose build
     docker-compose up --build
     docker-compose up -d
     docker-compose run -e NODE_ENV=test npm test
     docker tag gateway_<service> <user>/newshub_<service>
     docker push <user>/newshub_<service>

     docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
     docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
     docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

## License

Copyright (c) 2017 Bharat Arimilli
