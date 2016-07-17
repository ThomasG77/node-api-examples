export default {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  levelup: {
    db: 'hapi_leveldb',
    options: {
      keyEncoding: 'json',
      valueEncoding: 'json'
    }
  }
};
