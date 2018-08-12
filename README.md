# NewsHub

A student media management platform primarily written in full-stack JavaScript. NewsHub services are primarily written in Node.js while the front-end is based on React and Redux.

## Running

As this project is run using Docker Compose with the NewsHub API Gateway as the primary service, instructions for running this project are contained under the newshub-gateway README file (`/gateway/README.md`).

## Deployment

As this project is deployed through the NewsHub API gateway, instructions for deploying this project to production are contained under the `newshub-gateway` README file (`/gateway/README.md`).

## Components

NewsHub is comprised of a set of microservices (primarily written in Node.js), a React.js-based front-end and a variety of serverless functions.

### Services

#### NewsHub Monorepo Services

##### Production-Ready

* [newshub-client](https://github.com/bharatari/newshub/tree/master/client): Front-end built on React and Redux
* [newshub-authentication](https://github.com/bharatari/newshub/tree/master/services/authentication): Authentication and authorization
* [newshub-gateway](https://github.com/bharatari/newshub/tree/master/gateway): API gateway
* [newshub-events](https://github.com/bharatari/newshub/tree/master/services/events): Events and timesheets
* [newshub-reservations](https://github.com/bharatari/newshub/tree/master/services/reservations): Equipment reservations

##### In Progress

* [newshub-room-reservations](https://github.com/bharatari/newshub/tree/master/services/room-reservations): Room reservations
* [newshub-stories](https://github.com/bharatari/newshub/tree/master/services/stories): News cycle management and project management

#### External NewsHub Services

* [newshub-client-server](https://github.com/bharatari/newshub-client-server): NewsHub's client server built on Koa

#### Serverless Functions

* [newshub-functions](https://github.com/bharatari/newshub-functions): Includes all serverless functions as git submodules
  * [newshub-email](https://github.com/bharatari/newshub-email): Email functionality

## License

Copyright (c) 2018 Bharat Arimilli
