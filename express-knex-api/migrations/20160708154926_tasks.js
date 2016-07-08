
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('tasks', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('done');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tasks')
  ]);
};
