# NodeJS REST API

[![Dependency Status](https://david-dm.org/mateuszwende/nodejs-api.svg)](https://david-dm.org/mateuszwende/nodejs-api)
[![Coverage Status](https://coveralls.io/repos/github/mateuszwende/nodejs-api/badge.svg?branch=master)](https://coveralls.io/github/mateuszwende/nodejs-api?branch=master)
[![Build Status](https://travis-ci.org/mateuszwende/nodejs-api.svg?branch=master)](https://travis-ci.org/mateuszwende/nodejs-api)

**Live Demo:** https://bb-backend-1.herokuapp.com/api/users

An [Express](https://expressjs.com/) app that exposes a RESTful API for a single resource.

### Features

- [Express.js](https://expressjs.com/) as the web framework.
- [Helmet](https://github.com/helmetjs/helmet) to protect from some well-known web vulnerabilities
- ES2017 syntax.
- Linting with [ESLint](http://eslint.org/).
- Conforms to [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).
- Testing with [Mocha](https://mochajs.org/).
  - Continuous Integration (CI) with [Travis CI](https://travis-ci.org/). (see below).
  - Code coverage with [Coveralls](https://coveralls.io/github/mateuszwende/nodejs-api).
- Model–view–controller (MVC) architectural pattern.
- Heroku/Dokku support.

### Core Libraries/Modules

- [Express.js](https://expressjs.com/)
- [mongoose](http://mongoosejs.com/)
- [body-parser](https://github.com/expressjs/body-parser)
- [Helmet](https://github.com/helmetjs/helmet)
- [Jest](https://mochajs.org/)
- [ESLint](https://github.com/eslint/eslint)
- [nodemon](https://github.com/remy/nodemon)

## Available routes

**Note**: All endpoints are relative to `/api`, unless otherwise noted.

| HTTP Method | URL                 | Description              |
| :---------: | :------------------ | :----------------------- |
|    `GET`    | `/users`            | Returns a list of users. |
|    `GET`    | `/users/:id`        | Returns a user.          |
|   `POST`    | `/users/register`   | Creates a new user.      |
|  `DELETE`   | `/users/delete/:id` | Deletes a user.          |
|  `UPDATE`   | `/users/update/:id` | Updates a user.          |

## Prerequisites

- [MongoDB](https://www.mongodb.com/download-center)
- [Node.js 10.x](https://nodejs.org/)

## Getting started

```bash
# Clone the project
git clone https://github.com/mateuszwende/nodejs-api.git
cd nodejs-api

# Install dependencies
npm install

```

This project makes use of [dotenv](https://www.npmjs.com/package/dotenv) module for injecting environment variables while developing. Be sure to create a copy of the provided `.env.example` and name it `.env`.

```bash
# Run app in dev mode
npm run dev
```

## Tests

Simply execute the test script which run all the tests and generate code coverage.

**Note**: Ensure you have MongoDB running. Ideally MongoDB and mongoose should be mocked, but they're not.

```bash
# Run tests and generate coverage
npm run test
```
