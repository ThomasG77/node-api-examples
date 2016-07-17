export default {
  isTest: true,
  server: {
    port: 3000,
    host: 'localhost'
  },
  levelup: {
    db: 'hapi_leveldb_test',
    options: {
      keyEncoding: 'json',
      valueEncoding: 'json'
    }
  }
};
