import consign from 'consign';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import Sequelize from 'sequelize';
import config from './config.js';

const app = express();
const sequelize = new Sequelize(
  config.sequelize.database,
  config.sequelize.username,
  config.sequelize.password,
  config.sequelize.params
);

app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

consign(config.consign)
  .include('models')
  .then('routes')
  .into(app, sequelize)
;

sequelize
  .sync()
  .then(() => {
    app.listen(config.server.port, () => {
      if (!config.isTest) {
        console.log('Express-Sequelize TODO API');
        console.log(`Address: ${config.server.host}:${config.server.port}`);
      }
    });
  })
  .error(err => {
    if (err) {
      console.log(`Database ${config.sequelize.database} connection error:`);
      throw err;
    }
  })
;

export default app;
