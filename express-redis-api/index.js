import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import redis from 'redis';
import config from './config.js';

const app = express();
const db = redis.createClient(config.redis);

app.use(morgan('common', { skip: () => config.isTest }));
app.use(helmet());
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

consign(config.consign)
  .include('models')
  .then('routes')
  .into(app, db)
;

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Express-Redis TODO API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;
