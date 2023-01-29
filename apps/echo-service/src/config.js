module.exports = {
  logLevel: process.env.LOG_LEVEL || 'info',
  msOptions: {
    servers: process.env.NATS_SERVER,
  },
};
