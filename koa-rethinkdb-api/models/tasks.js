import r from 'rethinkdb';
import val from 'lx-valid';
import config from '../config.js';

module.exports = () => {
  const Tasks = {
    tableName: 'tasks',
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
        const conn = yield r.connect(config.rethinkdb);
        const cursor = yield r.table(this.tableName).run(conn);
        return yield cursor.toArray();
      } catch (err) {
        return err;
      }
    },
    * get(taskId) {
      try {
        const conn = yield r.connect(config.rethinkdb);
        return yield r.table(this.tableName).get(taskId).run(conn);
      } catch (err) {
        return err;
      }
    },
    * insert(task) {
      try {
        const validation = this.validate(task, false);
        if (validation.valid) {
          const conn = yield r.connect(config.rethinkdb);
          const res = yield r.table(this.tableName).insert(task).run(conn);
          return yield r.table(this.tableName).get(res.generated_keys[0]).run(conn);
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
          const { update } = config.model;
          const conn = yield r.connect(config.rethinkdb);
          const res = yield r.table(this.tableName).get(taskId).update(task, update).run(conn);
          return res.changes[0] && res.changes[0].new_val;
        }
        return validation.errors;
      } catch (err) {
        return err;
      }
    },
    * delete(taskId) {
      try {
        const conn = yield r.connect(config.rethinkdb);
        yield r.table(this.tableName).get(taskId).delete().run(conn);
        return null;
      } catch (err) {
        return err;
      }
    }
  };
  return Tasks;
};
