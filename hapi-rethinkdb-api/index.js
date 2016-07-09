import Hapi from 'hapi';
import config from './config';
import handlers from './handlers';

const server = new Hapi.Server();
const { host, port } = config.server;

server.connection({ host, port });

server.register(handlers, (err) => {
  if (err) throw err;

  server.start(() => {
    console.log('Hapi-RethinkDB TODO API');
    console.log(`Address: http://localhost:${server.info.port}`);
  });
});

export default server;
