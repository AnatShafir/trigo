# Trigo

Mono-repo for 'trigo' project

## Apps

- gateway

  http server and message publisher

- math-service

  subscriber to 'math' related messages

- echo-service

  subscriber to 'echo' related messages

## libs

- message-service-interface

  wrapper library for NATS client

## Getting started

   ```bash
   npm start
   ```

## Testing and coverage

   ```bash
   npm run test-compose-up
   npm run test
   npm run test-coverage
   ```

## Built With

- Web server: [fastify.io](https://www.fastify.io/)
- Message service client: [NATS.js](https://github.com/nats-io/nats.js)

**Author:** *Anat Shafir*