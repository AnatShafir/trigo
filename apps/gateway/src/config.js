module.exports = {
  loggerOptions: {
    ...(process.env.LOG_LEVEL) && { level: process.env.LOG_LEVEL },
  },
  port: process.env.PORT,
  msOptions: {
    servers: process.env.NATS_SERVER,
  },
};
