export default {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  rethinkdb: {
    db: 'koa_rethinkdb',
    host: 'localhost',
    port: 28015
  },
  consign: {
    verbose: false
  },
  model: {
    schema: {
      unknownProperties: 'delete'
    },
    update: {
      returnChanges: true
    }
  }
};
