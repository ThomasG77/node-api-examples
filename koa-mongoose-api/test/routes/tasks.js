/* global describe, before, after, beforeEach, it */
/* global expect, app, config, request */

describe('Routes: Tasks', () => {
  const Tasks = app.models.tasks;
  const tasks = [
    { _id: '577c68c99c1c91dd96db5637', name: 'study hard!', done: false },
    { _id: '577c68ff9c1c91dd96db5638', name: 'work soft!', done: false }
  ];

  beforeEach(done => {
    Tasks.remove({}, () => Tasks.insertMany(tasks, done));
  });

  describe('GET /tasks', () => {
    describe('status 200', () => {
      it('returns a list of tasks', done => {
        request.get('/tasks')
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body).to.include(tasks[0]);
            expect(res.body).to.include(tasks[1]);
            done(err);
          });
      });
    });
  });

  describe('POST /tasks', () => {
    describe('status 200', () => {
      it('creates a new task', done => {
        request.post('/tasks')
          .send({ name: 'run fast!', done: false })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('run fast!');
            expect(res.body.done).to.eql(false);
            done(err);
          });
      });
    });
  });

  describe('GET /tasks/:id', () => {
    describe('status 200', () => {
      it('returns one task', done => {
        request.get(`/tasks/${tasks[0]._id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body._id).to.eql(tasks[0]._id);
            expect(res.body.name).to.eql(tasks[0].name);
            expect(res.body.done).to.eql(tasks[0].done);
            done(err);
          });
      });
    });
    describe('status 404', () => {
      it('throws error when task not exist', done => {
        request.get('/tasks/id-not-exist')
          .expect(404)
          .end(err => done(err));
      });
    });
  });

  describe('PUT /tasks/:id', () => {
    describe('status 200', () => {
      it('updates a task', done => {
        request.put(`/tasks/${tasks[0]._id}`)
          .send({ name: 'travel a lot!', done: true })
          .expect(200)
          .end((err, res) => {
            expect(res.body._id).to.eql(tasks[0]._id);
            expect(res.body.name).to.eql('travel a lot!');
            expect(res.body.done).to.eql(true);
            done(err);
          });
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    describe('status 204', () => {
      it('removes a task', done => {
        request.delete(`/tasks/${tasks[0]._id}`)
          .expect(204)
          .end(err => done(err));
      });
    });
  });
});
