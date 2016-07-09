import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import Knex from 'knex'
import config from './config.js';

const app = express();
const knex = Knex(config.knex);

knex.migrate.latest([config.knex]);

app.use(morgan('common', { skip: () => config.isTest }));
app.use(helmet());
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

consign(config.consign)
  .include('models')
  .then('routes')
  .into(app, knex)
;

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Express-Knex TODO API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;
