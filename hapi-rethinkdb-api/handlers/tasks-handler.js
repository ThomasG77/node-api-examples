import Joi from 'joi';
import Boom from 'boom';
import config from '../config';

// Helpers
import db from '../helpers/db';

// Models
import TasksModel from '../models/tasks';
const Tasks = new TasksModel();

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/tasks',
    handler(req, reply) {
      Tasks.list((err, tasks) => {
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
      Tasks.get(taskId, (err, task) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        if (task) {
          return reply(task);
        }
        return reply(Boom.notFound('task not found'));
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/tasks',
    handler(req, reply) {
      const task = req.payload;
      Tasks.insert(task, (err, newTask) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        return reply(newTask);
      });
    },
    config: {
      validate: {
        payload: {
          "name": Joi.string().required(),
          "done": Joi.boolean().required()
        }
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/tasks/{taskId}',
    handler(req, reply) {
      const { taskId } = req.params;
      const task = req.payload;
      Tasks.update(taskId, task, (err, newTask) => {
        if (err) {
          return reply(Boom.wrap(err));
        }
        return reply(newTask);
      });
    },
    config: {
      validate: {
        payload: {
          "name": Joi.string().required(),
          "done": Joi.boolean().required()
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/tasks/{taskId}',
    handler(req, reply) {
      const { taskId } = req.params;
      Tasks.delete(taskId, (err) => {
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
