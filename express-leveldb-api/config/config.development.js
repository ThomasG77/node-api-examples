export default {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  levelup: {
    db: 'express_leveldb',
    options: {
      keyEncoding: 'json',
      valueEncoding: 'json'
    }
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
