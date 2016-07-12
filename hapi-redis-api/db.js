import redis from 'redis';
import config from './config.js';

let db = null;

module.exports = () => {
  if (!db) {
    db = redis.createClient(config.redis);
  }
  return db;
};
