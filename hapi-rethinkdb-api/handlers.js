import fs from 'fs';

const handlers = [];

fs.readdirSync('./handlers').forEach(file => {
  const path = `./handlers/${file}`;
  handlers.push(require(path));
});

export default handlers;
