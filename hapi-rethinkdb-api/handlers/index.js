import fs from 'fs';

let handlers = [];

fs.readdirSync(__dirname).forEach((file) => {
  if(file.match(/\-handler\.js/gi))
    handlers = [...handlers, require(`${__dirname}/${file}`)];
});

export default handlers;
