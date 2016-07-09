export default {
  isTest: true,
  server: {
    port: 3000,
    host: 'localhost'
  },
  rethinkdb: {
    db: 'hapi_rethinkdb',
    host: 'localhost',
    port: 28015
  },
  model: {
    update: {
      returnChanges: true
    }
  }
};
