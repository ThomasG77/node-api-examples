export default {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  sequelize: {
    database: 'express_sequelize',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: 'express_sequelize.sqlite',
      define: {
        underscored: true,
        timestamps: false
      }
    }
  },
  consign: {
    verbose: false
  }
};
