import uuid from 'node-uuid';
import val from 'lx-valid';
import config from '../config.js';

module.exports = (app, redis) => {
  const Tasks = {
    namespace: 'tasks',
    fields: {
      properties: {
        name: {
          type: 'string',
          trim: true,
          required: true
        },
        done: {
          type: 'boolean'
        }
      }
    },
    validate(data, isUpdate = false) {
      const { schema } = config.model;
      schema.isUpdate = isUpdate;
      const validate = val.getValidationFunction();
      return validate(data, this.fields, schema);
    },
    list(done) {
      redis.hvals(this.namespace, (err, result) => {
        if (err) {
          return done(err);
        }
        return done(null, result.map(task => JSON.parse(task)));
      });
    },
    get(taskId, done) {
      redis.hget([this.namespace, taskId], (err, task) => {
        if (err) {
          return done(err);
        }
        return done(null, JSON.parse(task));
      });
    },
    insert(task, done) {
      const validation = this.validate(task, false);
      if (validation.valid) {
        const taskId = uuid.v1();
        Object.assign(task, { id: taskId });
        redis.hset([this.namespace, taskId, JSON.stringify(task)], (err) => {
          if (err) {
            return done(err);
          }
          return this.get(taskId, done);
        });
        return true;
      }
      return done(validation.errors);
    },
    update(taskId, task, done) {
      const validation = this.validate(task, true);
      if (validation.valid) {
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
        return true;
      }
      return done(validation.errors);
    },
    delete(taskId, done) {
      redis.hdel([this.namespace, taskId], done);
    }
  };
  return Tasks;
};
