import Router from 'koa-router';

module.exports = app => {
  const Tasks = app.models.tasks;
  const router = new Router();

  router
    .get('/tasks', function *() {
      try {
        const tasks = yield Tasks.find({});
        this.body = tasks;
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .get('/tasks/:taskId', function *() {
      try {
        const taskId = this.params.taskId;
        const task = yield Tasks.findById(taskId);
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
        this.body = yield Tasks.create(task);
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .put('/tasks/:taskId', function *() {
      try {
        const taskId = this.params.taskId;
        const task = this.request.body;
        yield Tasks.update({ _id: taskId }, { $set: task });
        const newTask = yield Tasks.findById(taskId);
        if (newTask) {
          this.body = newTask;
        } else {
          this.status = 404;
        }
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .delete('/tasks/:taskId', function *() {
      try {
        const taskId = this.params.taskId;
        yield Tasks.findByIdAndRemove(taskId);
        this.status = 204;
      } catch (err) {
        this.throw(412, { err });
      }
    })
  ;

  app.use(router.routes());
  app.use(router.allowedMethods());
};
