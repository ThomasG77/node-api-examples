import 'babel-polyfill';
import consign from 'consign';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import level from 'level';
import config from './config.js';

const app = koa();
const db = level(config.levelup.db, config.levelup.options);

app.use(bodyParser());

consign(config.consign)
  .include('models')
  .then('routes')
  .into(app, db)
;

app.use(compress());

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('Koa-LevelDB TODO API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});

export default app;
