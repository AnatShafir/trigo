module.exports = {
  logLevel: process.env.LOG_LEVEL || 'info',
  port: process.env.PORT || 80,
  msOptions: {
    servers: process.env.NATS_URL,
  },
};
