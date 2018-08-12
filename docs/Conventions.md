# Conventions

The NewsHub project follows a set of conventions to ensure and predictability and consistency between our various microservices.

## Folder Structure

Wherever possible, folders should be **kebab-cased** to avoid cross-platform inconsistencies.

File naming conventions should follow platform specific guidelines. For example, JavaScript projects should follow UpperCamelCase for class definition files and lowerCamelCase otherwise.

## URLs

URLs and endpoints are always kebab-cased.

## Service/Model Naming

Depending on the context, services and models may be referred to in their kebab-case form *or* camelCase form. The `newshub-room-reservation` service resides in the `/services/room-reservation` folder to follow the kebab-case folder structure naming convention and resides on the `/api/room-reservation` endpoint to follow the kebab-case endpoint naming convention. However, in all other contexts the service and model are referred to in their camelCase form. Within permissions, models are camelCased while the rest of the permission is kebab-cased. 

## Permissions

Within permission strings, models are camelCased while the rest of the permission is kebab-cased. This is to follow the convention of camelCasing models and services (except in endpoints and folders) while also visually differentiating models from the specific permission being given in the permission string.

## Service Manifest

All services should have a manifest file in the project's native file format within the root source code directory. In Node.js projects, the root source code directory is generally `src` and therefore Node.js NewsHub services have their manifest files at `/src/manifest.js`.

The manifest file defines the service's capabilities, associated roles and associated services and models.

## Docker Images

In the context of docker services and images, names are snake_case to follow Docker's naming convention.
