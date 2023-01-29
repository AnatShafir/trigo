module.exports = {
  logLevel: process.env.LOG_LEVEL,
  msOptions: {
    servers: process.env.NATS_SERVER,
  },
};
