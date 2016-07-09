import model from 'seraph-model';
import db from 'seraph';

db({ 
  user: 'neo4j',
  pass: '123' 
});

const tasks = model(db,'tasks');

tasks.fields = [
  'name',
  'done'
];

tasks.schema = {
  name: { type: String, trim: true, required: true },
  done: { type: Boolean }
};

module.exports = tasks;


