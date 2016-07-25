export default {
  isTest: true,
  server: {
    port: 3000,
    host: 'localhost'
  },
  levelup: {
    db: 'koa_leveldb_test',
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
