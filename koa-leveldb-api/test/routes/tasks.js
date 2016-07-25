/* global describe, before, after, beforeEach, it */
/* global expect, app, uuid, config, request */

describe('Routes: Tasks', () => {
  const Tasks = app.models.tasks;
  const tasks = [
    { id: uuid.v1(), name: 'study hard!', done: false },
    { id: uuid.v1(), name: 'work soft!', done: false }
  ];

  beforeEach(function *() {
    const taskList = yield Tasks.list();
    taskList.forEach(task => Tasks.delete(task.id));
    yield Tasks.insert(tasks[0]);
    yield Tasks.insert(tasks[1]);
  });

  describe('GET /tasks', () => {
    describe('status 200', () => {
      it('returns a list of tasks', function *() {
        request.get('/tasks')
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body).to.include(tasks[0]);
            expect(res.body).to.include(tasks[1]);
          });
      });
    });
  });

  describe('POST /tasks', () => {
    describe('status 200', () => {
      it('creates a new task', function *() {
        request.post('/tasks')
          .send({ name: 'run fast!', done: false })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('run fast!');
            expect(res.body.done).to.eql(false);
          });
      });
    });
  });

  describe('GET /tasks/:id', () => {
    describe('status 200', () => {
      it('returns one task', function *() {
        request.get(`/tasks/${tasks[0].id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.id).to.eql(tasks[0].id);
            expect(res.body.name).to.eql(tasks[0].name);
            expect(res.body.done).to.eql(tasks[0].done);
          });
      });
    });
    describe('status 404', () => {
      it('throws error when task not exist', function *() {
        request.get('/tasks/id-not-exist').expect(404);
      });
    });
  });

  describe('PUT /tasks/:id', () => {
    describe('status 200', () => {
      it('updates a task', function *() {
        request.put(`/tasks/${tasks[0].id}`)
          .send({ name: 'travel a lot!', done: true })
          .expect(200)
          .end((err, res) => {
            expect(res.body.id).to.eql(tasks[0].id);
            expect(res.body.name).to.eql('travel a lot!');
            expect(res.body.done).to.eql(true);
          });
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    describe('status 204', () => {
      it('removes a task', function *() {
        request.delete(`/tasks/${tasks[0].id}`).expect(204);
      });
    });
  });
});
