import uuid from 'node-uuid';
import val from 'lx-valid';
import read from 'co-read';
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
    * list() {
      try {
        let task;
        const tasks = [];
        const stream = db.createValueStream();
        while (task = yield read(stream)) {
          tasks.push(task);
        }
        return tasks;
      } catch (err) {
        return err;
      }
    },
    * get(taskId) {
      try {
        return yield db.get(`${this.namespace}_${taskId}`);
      } catch (err) {
        return err;
      }
    },
    * insert(task) {
      try {
        const validation = this.validate(task, false);
        if (validation.valid) {
          const taskId = uuid.v1();
          const namespaceId = `${this.namespace}_${taskId}`;
          Object.assign(task, { id: taskId });
          yield db.put(namespaceId, task);
          return yield db.get(namespaceId);
        }
        return validation.errors;
      } catch (err) {
        return err;
      }
    },
    * update(taskId, task) {
      try {
        const validation = this.validate(task, true);
        if (validation.valid) {
          const namespaceId = `${this.namespace}_${taskId}`;
          Object.assign(task, { id: taskId });
          yield db.put(namespaceId, task);
          return yield db.get(namespaceId);
        }
        return validation.errors;
      } catch (err) {
        return err;
      }
    },
    * delete(taskId) {
      try {
        return yield db.del(`${this.namespace}_${taskId}`);
      } catch (err) {
        return err;
      }
    }
  };
  return Tasks;
};
