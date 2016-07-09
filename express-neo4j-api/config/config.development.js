module.exports = {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  mongodb: {
    uri: 'mongodb://localhost:27017/express_mongodb'
  },
  consign: {
    verbose: false
  }
};
