## Run RabbitMQ

  $ docker run -d -p 5672:5672 rabbitmq

## Start Gateway

  $ PORT=3000 node gateway.js

## Start Microservices

  $ node serviceA.js
  $ node serviceB.js

## Check Functionality

  url:    http://localhost:3000/command  
  method: [POST]
  request payload:  {"command": "businessCase1", "taskId": 1, "payload":  {"address": "address1"}}
