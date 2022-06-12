# Document Management System 
This repo contains 

    1. gRPC based microservice for DMS
    2. node-express based API connecting to gRPC server

## Running Locally 
1. To start the dms-microservice `cd` into dms-backend-api and run `npm install` and `npm run start`
2. To start the dms-backend `cd` into dms-backend-api and run `npm install` and `npm run start`

## Running Using Docker
To run both the services using Docker use `docker compose up` command

## Postman Collection 
Postman collection and environment files are attached with the repo.

## Login
1. For user login please use `email: johndoe@dms.com` and  `password: 1234` 
2. Once Login is successfull please update the postman environment with the token returned

