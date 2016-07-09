import uuid from 'node-uuid';
import val from 'lx-valid';
import config from '../config.js';

module.exports = (app, db) => {
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
      const tasks = [];
      const stream = db.createValueStream();
      stream.on('data', task => tasks.push(task));
      stream.on('error', err => done(err));
      stream.on('end', () => done(null, tasks));
    },
    get(taskId, done) {
      db.get(`${this.namespace}_${taskId}`, done);
    },
    insert(task, done) {
      const validation = this.validate(task, false);
      if (validation.valid) {
        const taskId = uuid.v1();
        const namespaceId = `${this.namespace}_${taskId}`;
        Object.assign(task, { id: taskId });
        db.put(namespaceId, task, err => {
          if (err) {
            return done(err);
          }
          return db.get(namespaceId, done);
        });
        return true;
      }
      return done(validation.errors);
    },
    update(taskId, task, done) {
      const validation = this.validate(task, true);
      if (validation.valid) {
        const namespaceId = `${this.namespace}_${taskId}`;
        Object.assign(task, { id: taskId });
        db.put(namespaceId, task, err => {
          if (err) {
            return done(err);
          }
          return db.get(namespaceId, done);
        });
        return true;
      }
      return done(validation.errors);
    },
    delete(taskId, done) {
      return db.del(`${this.namespace}_${taskId}`, done);
    }
  };
  return Tasks;
};
