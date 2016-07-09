import val from 'lx-valid';
import config from '../config.js';

module.exports = (app, knex) => {
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
    list(done) {
      knex.select('*')
        .from(this.tableName)
        .then(tasks => done(null, tasks))
        .catch(err => done(err))
      ;
    },
    get(taskId, done) {
      knex.select('*')
        .from(this.tableName)
        .where({ id: taskId })
        .then(task => done(null, task[0]))
        .catch(err => done(err))
      ;
    },
    insert(task, done) {
      const validation = this.validate(task, false);
      if (validation.valid) {
        knex.insert(task)
          .into(this.tableName)
          .then(result => {
            knex.select('*')
              .from(this.tableName)
              .where({ id: result[0] })
              .then(newTask => done(null, newTask[0]))
              .catch(err => done(err))
            ;
          })
          .catch(err => done(err))
        ;
      } else {
        done(validation.errors);
      }
    },
    update(taskId, task, done) {
      const validation = this.validate(task, true);
      if (validation.valid) {
        knex(this.tableName)
          .where('id', taskId)
          .update(task)
          .then(() => {
            knex.select('*')
              .from(this.tableName)
              .where({ id: taskId })
              .then(newTask => done(null, newTask[0]))
              .catch(err => done(err))
            ;
          })
          .catch(err => done(err))
        ;
      } else {
        done(validation.errors);
      }
    },
    delete(taskId, done) {
      knex(this.tableName)
        .where('id', taskId)
        .delete()
        .then(() => done(null))
        .catch(err => done(err))
      ;
    }
  };
  return Tasks;
};
