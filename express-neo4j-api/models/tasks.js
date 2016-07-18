import model from 'seraph-model';
import config from '../config.js';

module.exports = (app, db) => {
  const tasks = model(db, `tasks${config.neo4j.envDb}`);

  tasks.schema = {
    name: { type: String, trim: true, required: true },
    done: { type: Boolean }
  };

  return tasks.db;
};
