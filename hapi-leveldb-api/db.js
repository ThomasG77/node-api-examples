import level from 'level';
import config from './config.js';

let db = null;

module.exports = () => {
  if (!db) {
    db = level(config.levelup.db, config.levelup.options);
  }
  return db;
};
