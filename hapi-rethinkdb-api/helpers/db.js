import config from '../config';
import r from 'rethinkdb';

const { host, port, db } = config.rethinkdb;

export default {
  connect() {
    const conn = r.connect({ host, port, db });
    return conn;
  }
}
