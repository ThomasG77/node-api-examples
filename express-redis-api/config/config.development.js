export default {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0
  },
  consign: {
    verbose: false
  },
  model: {
    schema: {
      unknownProperties: 'delete'
    }
  }
};
