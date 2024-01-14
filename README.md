# Project Name

This project is a nodejs with TypeScript application that uses Mysql for data storage and TypeORM for database management.
This is part of the Project manager node microservice cluster, responsible only for project and task entities.

## Features
  
- [x] Project creation
- [x] Project data retrieval
- [x] Project data update
- [x] Project data deletion
- [x] Feature and unit tests

- [x] Jwt token validation
- [x] Kafka subscriber to replicate newly created users through auth manager microservice
- [x] Basic mysql docker containerization

## Next steps

- [ ] Project data propagation through kafka to other microservices
- [ ] Project tasks CRUD 
- [ ] Tasks assignment to users
- [ ] Production environment setup
- [ ] Better Docker containerization
- [ ] Mono repository setup
- [ ] CI/CD pipeline setup
- [ ] Better logging

## Check the other microservices

- [ ] [Auth manager] (https://github.com/schirliuradu/Auth-manager-node)