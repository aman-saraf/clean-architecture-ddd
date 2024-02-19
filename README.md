# DiscoverVet Portal API

This project has API definitons which are being used on the DiscoverVet public facing app for the pet parents.

## Tech Stack

- [Typescript](https://www.typescriptlang.org/): Programming Language

- [ExpressJS](https://github.com/expressjs/express) : API Web framework for Node

- [TypeDi](https://github.com/typestack/typedi) : Dependency Injection & IOC library for Typescript & ExpressJS

- [Routing Controllers](https://github.com/typestack/routing-controllers) : Library to use Express controllers as REST
  endpoints definitions and decorators for REST endpoints

- [TypeORM](https://github.com/typeorm/typeorm) : ORM Library for Typescript & SQL

- [Class Validator](https://github.com/typestack/class-validator) : Validation framework for classes

- [Class Transformer](https://github.com/typestack/class-transformer) : Serialisaton / Deseralisation library

- [PostgreSQL](https://www.postgresql.org/) : SQL database

- [Winston](https://github.com/winstonjs/winston): Logging framework

- [Warden](https://github.com/expressjs/morgan): HTTP request logger middleware

## Circle CI Deployment

To trigger the build and deployment pipeline provide the following parameters in CircleCI.

| Parameter   | Description                                             | Default |
| ----------- | ------------------------------------------------------- | ------- |
| environment | Target environment (dev, prod) name to deploy the build | dev     |
| tag         | Docker image tag to push in ECR                         | ""      |
