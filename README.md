# NewsHub Gateway

An API gateway for NewsHub.

# Common Commands

     docker-compose build
     docker-compose up --build
     docker-compose up -d
     docker tag gateway_<service> <user>/newshub_<service>
     docker push <user>/newshub_<service>

     docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
     docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
     docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

## License

Copyright (c) 2017 Bharat Arimilli
