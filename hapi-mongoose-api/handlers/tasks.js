import Boom from 'boom';
import Tasks from '../models/tasks.js';

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/tasks',
    handler(req, reply) {
      Tasks.find({}, (err, tasks) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        return reply(tasks);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/tasks/{taskId}',
    handler(req, reply) {
      const { taskId } = req.params;
      Tasks.findById(taskId, (err, task) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        if (task) {
          return reply(task);
        }
        return reply().code(404);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/tasks',
    handler(req, reply) {
      const task = req.payload;
      Tasks.create(task, (err, newTask) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        return reply(newTask);
      });
    }
  });

  server.route({
    method: 'PUT',
    path: '/tasks/{taskId}',
    handler(req, reply) {
      const { taskId } = req.params;
      const task = req.payload;
      Tasks.update({ _id: taskId }, { $set: task }, (err) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        Tasks.findById(taskId, (findErr, newTask) => {
          if (findErr) {
            return reply(Boom.wrap(findErr));
          }
          return reply(newTask);
        });
        return true;
      });
    }
  });

  server.route({
    method: 'DELETE',
    path: '/tasks/{taskId}',
    handler(req, reply) {
      const { taskId } = req.params;
      Tasks.findByIdAndRemove(taskId, (err) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        return reply().code(204);
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'tasks-handler',
  version: '1.0.0'
};
