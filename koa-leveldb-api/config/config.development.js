export default {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  levelup: {
    db: 'koa_leveldb',
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
