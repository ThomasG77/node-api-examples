exports.up = (knex, Promise) => {
  Promise.all([
    knex.schema.createTableIfNotExists('tasks', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('done');
    })
  ]);
};

exports.down = (knex, Promise) => {
  Promise.all([
    knex.schema.dropTable('tasks')
  ]);
};
