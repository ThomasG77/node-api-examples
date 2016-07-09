exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('tasks', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('done');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('tasks')
  ]);
};
