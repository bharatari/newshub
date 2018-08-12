# Permissions

The NewsHub access control system was designed with modularity and extensibility in mind, however, in the practice only a subset of its features have been implemented within our various microservices.

# Service-Level Permissions

Service level permissions are always checked on every service call and therefore every service-level permission is functional.

Examples:
* `reservation:create`
* `reservation:read`
* `reservation:update`
* `reservation:delete`

# Property-Level Permissions

Only certain property permissions are actively checked within the system. Supported property permissions are listed in `src/manifest.js` for each Node.js-based microservice. The manifest should exist in every microservice in the root source code folder. The location will vary for services using other platforms. Read property permissions are currently largely unsupported.

Examples:
* `user:update:roles`

# Custom Permissions

Custom permissions define custom user actions that are explicitly checked against within our various services.


