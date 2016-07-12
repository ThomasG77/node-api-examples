import fs from 'fs';
import Hapi from 'hapi';
import mongoose from 'mongoose';
import config from './config.js';

const server = new Hapi.Server();

mongoose.connect(config.mongodb.uri);

const handlers = [];

fs.readdirSync('./handlers').forEach(file => {
  const path = `./handlers/${file}`;
  handlers.push(require(path));
});

server.connection(config.server);

server.register(handlers, (err) => {
  if (err) throw err;

  server.start(() => {
    if (!config.isTest) {
      console.log('Hapi-Mongoose TODO API');
      console.log(`Address: ${config.server.host}:${config.server.port}`);
    }
  });
});

export default server;
