import model from 'seraph-model';

module.exports = (app, db) => {
  const tasks = model(db,'tasks');

  tasks.fields = [
    'name',
    'done'
  ];

  tasks.schema = {
    name: { type: String, trim: true, required: true },
    done: { type: Boolean }
  };

  return tasks;
}
