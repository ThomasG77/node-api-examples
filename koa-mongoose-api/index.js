import 'babel-polyfill';
import consign from 'consign';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config.js';

const app = koa();

mongoose.Promise = bluebird;
mongoose.connect(config.mongodb.uri);
app.use(bodyParser());

consign(config.consign)
  .include('models')
  .then('routes')
  .into(app)
;

app.use(compress());

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Koa-Mongoose TODO API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;
