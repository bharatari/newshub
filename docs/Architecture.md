# Architecture

Our microservices architecture is designed to be scalable and resilient.

## Services

Services are designed to be independent and loosely-coupled. This means that they completely own their domain and can be deployed and scaled independently from other services. Services maintain their own database schemas and do not have direct access to tables belonging to other services.

### Inter-Process Communication

#### Synchronous Communication

Synchronous communication should be avoided entirely. This tightly couples services together and essentially results in a single larger monolith rather than two independent services. There are some instances of synchronous communication in our current architecture but the eventual goal is to remove these to improve reliability and testability.

#### Gateway Data Aggregation

A level of data aggregation can occur in the gateway to reduce cross-service chatter and keep microservices loosely-coupled. This will most often include retrieving data related to authorization and authentication. Keeping this activity in the gateway allows each microservice to focus on their domain rather than worrying about other concerns. However, this should be kept at a minimum. Too much data aggregation in the gateway can cause the gateway to contain business logic, which should be avoided as the microservice itself should own its business logic.

There are some security implications with this model. All data passed to microservices from the gateway will need to be implicitly trusted and therefore microservices will need to be properly secured from unauthorized direct access. Otherwise, anyone could pass invalid data to the microservice and get unauthorized access. Strong authentication and authorization needs to happen either at the gateway or microservice level so the entire microservice architecture can be secured.

#### Asynchronous Communication

The most effective way for services to communicate is through asynchronous messaging. This allows services to update other services or request an action to be performed, all while keeping each service loosely-coupled. If a service A communicates asynchronously with service B and service B is down, service A can still continue to operate properly. Service A and B can both be scaled as necessary without affecting the other and deployments can happen independently.

## Data Redundancy

To reduce cross-service chatter, some data (especially user data) is stored redundantly within microservices. This is okay because in most cases the redundantly stored data is simply a snapshot of the data *at that given time*. 

If a need arises to keep this redundant data up-to-date, we could simply use webhooks or scheduled tasks to update previous redundant data.

## Testing

Testing needs to occur at multiple levels. 

* Each microservice must be tested independently (in isolation) to test the service's own business logic
* Integration tests must test the integration between the gateway and the microservices to ensure that requests are being properly proxied and handled
* End-to-end tests will test the NewsHub system as a whole with common user interactions testing multiple different services and integrations
* The client must be tested in isolation and **also** with the gateway (as part of the above end-to-end tests)
