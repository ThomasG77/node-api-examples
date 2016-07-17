import 'babel-polyfill';
import consign from 'consign';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import config from './config.js';

const app = koa();

app.use(bodyParser());

consign(config.consign)
  .include('models')
  .then('routes')
  .into(app)
;

app.use(compress());

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Koa-RethinkDB TODO API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;
