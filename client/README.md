# <a href='http://www.arimilli.io'><img src='http://www.arimilli.io/logo/newshub-client.png' height='80'></a>
[![Build Status](https://travis-ci.com/bharatari/newshub-client.svg?token=X1vPctVSxD4sEeqPYVqS&branch=master)](https://travis-ci.com/bharatari/newshub-client)
[![Coverage Status](https://coveralls.io/repos/github/bharatari/newshub-client/badge.svg?branch=master)](https://coveralls.io/github/bharatari/newshub-client?branch=master)

The client implementation of the NewsHub project built on React and Redux.

## Developing

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies
    
    ```
    cd path/to/newshub-client; npm install
    ```

3. Start your app
    
    ```
    npm start
    ```

## Features

### Access Control System

Permissions and roles also regulate access control on the client. Oxygen Core components are access control-aware meaning components will change their appearance and structure based on the permissions the user has. For example, if a user has the permission to edit a certain field in a data record, it will appear as an editable field and if they only have read access, the field will display as static text.

Pages have access control in two ways. The first way is dependency-based access control where the permissions that are needed for the page to properly function are defined for each page. If the user does not have the required permissions, the page will not be accessible to them. The second way is custom access control where you can restrict certain pages to certain roles. Because roles are dynamically defined, these pages are dynamically restricted. In the code, a call to the server is made. The server knows what role is required to access the page (stored in the database) and whether the user has the role. Therefore it simply returns whether the user can access the role.

Dependency-based access control can simply look like this:
`/app/reservation` requires `reservation:read`
`/app/reservation/new` requires `reservation:create`

## Testing

How to perform testing in React and Redux applications isn't widely agreed-upon. Therefore, this following guide aims to describe this project's testing philosophy, driven by the needs of this project.

We aim to test four general things:
* The rendering of components based on a particular state
* The behavior of components and how it affects the state
* The state of the application and how it changes when actions are dispatched
* Critical parts of the application with acceptance (end-to-end) testing

The first two points involve testing React components while the third involves testing Redux modules such as actions and reducers. By testing these first three components of a React and Redux application, we will have a good amount of coverage of our application's behavior. We also aim to test critical parts of the application with acceptance (end-to-end) testing, although this should be done sparingly as unit and integration tests will better isolate problems with the application.

### Containers

Containers are smart components that are connected to the Redux store.

Containers have two purposes: 
* To pass down state from the store
* To affect the state by dispatching actions

Therefore, our goal in testing containers is to make sure that the props we expect are passed down and the actions that are passed down affect the state in the way we expect (thereby confirming the correct actions have been passed down). However, testing for this can end up creating tests that resemble existing code. Containers are quite straightforward and predictable and therefore, it makes more sense to test behavior based off of the props and actions that they pass down (some of which lives in components and views). Testing how the application renders based on a particular state is the responsibility of the components/views and so is testing any internal logic. However, any interaction with the store must be tested with the container (because views and components should be oblivious to the store) and for those tests, the focus should be on actual behavior.

### Components

Components are general React dumb components that are not rendered by a Route.

We test these in two ways:
* Checking how it renders based on a particular state
* Checking its behaviour and how it affects the state/rendering

The components should be oblivious to the state/store and should only concern themselves with their own props/state and behavior.

### Routes

Routes are containers that render a View. We test them as we would test any other container.

### Views

Views are components that are rendered by a route. We test them as we would test any other container.

In keeping with the philosophy of testing components, testing views should not directly involve the Redux store. We are only testing how the view renders based on a certain state and how it behaves with user interaction and other stimuli. Therefore, to test something that involves a Redux action we replace the actual action with a spy and ensure that the action is called in the manner we expect and then leave the testing of how it affects the store to the route tests. In the route tests, the actual action will be called with a mocked store and we will check against the changes we expect in the state tree. Put simply, tests that interact with the Redux store don't belong here.

Another point to consider is that the tests for the View should only concern logic that exists in the View itself. Any logic that occurs in children should be tested in the children component.

### Actions

We test action creators by making sure they dispatch the correct actions with the correct format and payload.

### Reducers

We test reducers by ensuring that they modify the state in response to an action in the manner we expect.

### Acceptance Tests

We can test the entire application with acceptance (or end-to-end) tests using Selenium WebDriver.

## Project Conventions

### Structure

Containers are general-use containers. Containers that are linked to routes and views go in the routes folder.

A "page" or "route" in the application is made up of a route (container component), a view (dumb component) and (usually) an associated set of styles (with CSS Modules).

### Naming Conventions

Under each folder, there's no need to append the type of file. Under Route, for example, you don't need to have HomeRoute, ProductRoute, all you need is Home, Product. Outside of this context, each file is known as its name with the type of file appended to it.

React Components are UpperCamelCase while other modules are lowerCamelCase.

## License

Copyright (c) 2015 Bharat Arimilli
