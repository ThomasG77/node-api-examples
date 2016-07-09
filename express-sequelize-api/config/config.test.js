export default {
  isTest: true,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  sequelize: {
    database: 'express_sequelize_test',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: 'express_sequelize.sqlite',
      logging: false,
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
