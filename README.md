## Run RabbitMQ

  $ docker run -d -p 5672:5672 rabbitmq

## Start Gateway

  $ PORT=3000 node service.js

## Start Microservices

  $ node approvement.js
  $ node finance.js
  $ node notification.js

## Check Functionality

  url:    http://localhost:3000/command  
  method: [POST]
  Request payload:  {"command": "checkApproved", "taskId": 1, "payload":  {"accountId": 1}}
