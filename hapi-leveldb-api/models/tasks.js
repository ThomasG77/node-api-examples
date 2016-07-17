import Joi from 'joi';
import uuid from 'node-uuid';
import db from '../db.js';

export default class Tasks {
  constructor() {
    this.namespace = 'tasks';
    this.db = db();
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
    const tasks = [];
    const stream = this.db.createValueStream();
    stream.on('data', task => tasks.push(task));
    stream.on('error', err => done(err));
    stream.on('end', () => done(null, tasks));
  }

  get(taskId, done) {
    this.db.get(`${this.namespace}_${taskId}`, done);
  }

  insert(task, done) {
    const taskId = uuid.v1();
    const namespaceId = `${this.namespace}_${taskId}`;
    Object.assign(task, { id: taskId });
    this.db.put(namespaceId, task, err => {
      if (err) {
        return done(err);
      }
      return this.db.get(namespaceId, done);
    });
  }

  update(taskId, task, done) {
    const namespaceId = `${this.namespace}_${taskId}`;
    Object.assign(task, { id: taskId });
    this.db.put(namespaceId, task, err => {
      if (err) {
        return done(err);
      }
      return this.db.get(namespaceId, done);
    });
  }

  delete(taskId, done) {
    this.db.del(`${this.namespace}_${taskId}`, done);
  }
}
