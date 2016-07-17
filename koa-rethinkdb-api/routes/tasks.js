import Router from 'koa-router';

module.exports = app => {
  const Tasks = app.models.tasks;
  const router = new Router();

  router
    .get('/tasks', function *() {
      try {
        const tasks = yield Tasks.list();
        this.body = tasks;
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .get('/tasks/:taskId', function *() {
      try {
        const taskId = this.params.taskId;
        const task = yield Tasks.get(taskId);
        if (task) {
          this.body = task;
        } else {
          this.status = 404;
        }
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .post('/tasks', function *() {
      try {
        const task = this.request.body;
        this.body = yield Tasks.insert(task);
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .put('/tasks/:taskId', function *() {
      try {
        const taskId = this.params.taskId;
        const task = this.request.body;
        const newTask = yield Tasks.update(taskId, task);
        this.body = newTask;
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .delete('/tasks/:taskId', function *() {
      try {
        const taskId = this.params.taskId;
        yield Tasks.delete(taskId);
        this.status = 204;
      } catch (err) {
        this.throw(412, { err });
      }
    })
  ;

  app.use(router.routes());
  app.use(router.allowedMethods());
};
