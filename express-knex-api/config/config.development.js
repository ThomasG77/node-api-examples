module.exports = {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  knex: {
    client: 'sqlite3',
    connection: {
      database: 'express_sequelize',
      filename: './express_sequelize.sqlite'
    },
    useNullAsDefault: true
  },
  model: {
    schema: {
      unknownProperties: 'delete'
    }
  },
  consign: {
    verbose: false
  }
};
