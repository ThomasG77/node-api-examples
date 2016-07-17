import Joi from 'joi';
import uuid from 'node-uuid';
import db from '../db.js';

const redis = db();

export default class Tasks {
  constructor() {
    this.namespace = 'tasks';
  }

  validate() {
    return {
      payload: {
        name: Joi.string().required(),
        done: Joi.boolean().default(false)
      }
    };
  }

  list(done) {
    redis.hvals(this.namespace, (err, result) => {
      if (err) {
        return done(err);
      }
      return done(null, result.map(task => JSON.parse(task)));
    });
  }

  get(taskId, done) {
    redis.hget([this.namespace, taskId], (err, task) => {
      if (err) {
        return done(err);
      }
      return done(null, JSON.parse(task));
    });
  }

  insert(task, done) {
    const taskId = uuid.v1();
    Object.assign(task, { id: taskId });
    redis.hset([this.namespace, taskId, JSON.stringify(task)], (err) => {
      if (err) {
        return done(err);
      }
      return this.get(taskId, done);
    });
  }

  update(taskId, task, done) {
    Object.assign(task, { id: taskId });
    this.get(taskId, (oldTaskErr, oldTask) => {
      if (oldTaskErr) {
        return done(oldTaskErr);
      }
      const newTask = Object.assign(oldTask, task);
      redis.hset([this.namespace, taskId, JSON.stringify(newTask)], (updateErr) => {
        if (updateErr) {
          return done(updateErr);
        }
        return this.get(taskId, done);
      });
      return true;
    });
  }

  delete(taskId, done) {
    redis.hdel([this.namespace, taskId], done);
  }
}
