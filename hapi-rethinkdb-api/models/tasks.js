import r from 'rethinkdb';
import Joi from 'joi';
import config from '../config.js';

export default class Tasks {
  constructor() {
    this.tableName = 'tasks';
  }

  validate() {
    return {
      payload: {
        "name": Joi.string().required(),
        "done": Joi.boolean().default(false)
      }
    }
  }

  list(done) {
    r.connect(config.rethinkdb).then((dbConn) => {
      r.table(this.tableName)
        .run(dbConn)
        .then(cursor => {
          cursor.toArray()
            .then(tasks => done(null, tasks))
            .error(err => done(err))
          ;
        })
        .error(err => done(err));
    });
  }

  get(taskId, done) {
    r.connect(config.rethinkdb).then((dbConn) => {
      r.table(this.tableName)
        .get(taskId)
        .run(dbConn)
        .then(task => done(null, task))
        .error(err => done(err));
    });
  }

  insert(task, done) {
    r.connect(config.rethinkdb).then((dbConn) => {
      r.table(this.tableName)
        .insert(task)
        .run(dbConn)
        .then(result => {
          r.table(this.tableName)
            .get(result.generated_keys[0])
            .run(dbConn)
            .then(newTask => done(null, newTask))
            .error(err => done(err))
          ;
        })
        .error(err => done(err));
    });
  }

  update(taskId, task, done) {
    r.connect(config.rethinkdb).then((dbConn) => {
      r.table(this.tableName)
        .get(taskId)
        .update(task, config.model.update)
        .run(dbConn)
        .then(result => {
          const { new_val } = result.changes[0] || {};
          done(null, new_val);
        })
        .error(err => done(err));
    });
  }

  delete(taskId, done) {
    r.connect(config.rethinkdb).then((dbConn) => {
      r.table(this.tableName)
        .get(taskId)
        .delete()
        .run(dbConn)
        .then(() => done(null))
        .error(err => done(err));
    });
  }
}
