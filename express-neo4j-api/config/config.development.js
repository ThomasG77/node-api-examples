export default {
  isTest: false,
  server: {
    port: 3000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  neo4j: {
    server: 'http://localhost:7474',
    user: 'neo4j',
    pass: '12345',
    envDb: '_dev'
  },
  consign: {
    verbose: false
  }
};
