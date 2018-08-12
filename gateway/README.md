# NewsHub Gateway

An API gateway for NewsHub.

## Running

1. Clone the `newshub` repository: `git clone https://github.com/bharatari/newshub.git`
2. Add `.env` files for each service with the parameters specified in the `.env.sample` file
2. `cd newshub/gateway`
3. `docker-compose up --build`
4. The Docker services will build and the services will be started
5. The services will be available through (and should only be accessed through) the API gateway at `http://localhost:8080`

## Deployment

1. Copy `docker-compose.yml` and `docker-compose.prod.yml` files to remote server
2. Copy `.env` files for each service to remote server
3. Build services locally using `docker-compose build`
4. Tag services with `docker tag gateway_<service> <user>/newshub_<service>:<version>`
5. Push services with `docker push <user>/newshub_<service>`
6. On remote server, edit `docker-compose.prod.yml` and update each service's image with it's new tag/version
7. On remote server, `docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull`
8. On remote server, run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

If you omit the tag/version when pushing the images, they will automatically be tagged as `latest`. The `docker-compose.prod.yml` included in this repository by default pulls from the `latest` tag because image versions are initially omitted. Once in a production environment, you should be sure to push images with versions and then reference these specific versions in the `docker-compose.prod.yml` file. Explicitly stating versions is the only way to know exactly what you are deploying each time you run docker-compose. Using versioning also allows you to quickly rollback to a previous version of an image in the case of any significant problems. For these reasons, it is highly recommended not to continue using the `latest` tag in production.

## Common Commands

     docker-compose build
     docker-compose up --build
     docker-compose up -d
     docker-compose run authentication -e NODE_ENV=test npm test
     docker tag gateway_<service> <user>/newshub_<service>
     docker push <user>/newshub_<service>

     docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
     docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
     docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

## License

Copyright (c) 2018 Bharat Arimilli
