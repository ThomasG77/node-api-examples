/* global describe, before, after, beforeEach, it */
/* global expect, uuid, async, config, server */
import TaskModel from '../../models/tasks.js';

describe('Handler: Tasks', () => {
  const Tasks = new TaskModel();
  const tasks = [
    { id: uuid.v1(), name: 'study hard!', done: false },
    { id: uuid.v1(), name: 'work soft!', done: false }
  ];

  beforeEach(done => {
    Tasks.list((listErr, result) => {
      async.each(result, (task, callback) => {
        Tasks.delete(task.id, callback);
      }, () => {
        Tasks.insert(tasks[0], () => {
          Tasks.insert(tasks[1], done);
        });
      });
    });
  });

  describe('GET /tasks', () => {
    describe('status 200', () => {
      it('returns a list of tasks', done => {
        server.inject({
          method: 'GET',
          url: '/tasks'
        }, (res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.result).to.have.length(2);
          done();
        });
      });
    });
  });

  describe('POST /tasks', () => {
    describe('status 200', () => {
      it('creates a new task', done => {
        server.inject({
          method: 'POST',
          url: '/tasks',
          payload: {
            name: 'run fast!',
            done: false
          }
        }, (res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.result.name).to.eql('run fast!');
          expect(res.result.done).to.eql(false);
          done();
        });
      });
    });
  });

  describe('GET /tasks/:id', () => {
    describe('status 200', () => {
      it('returns one task', done => {
        server.inject({
          method: 'GET',
          url: `/tasks/${tasks[0].id}`
        }, (res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.result.id).to.eql(tasks[0].id);
          expect(res.result.name).to.eql(tasks[0].name);
          expect(res.result.done).to.eql(tasks[0].done);
          done();
        });
      });
    });
    describe('status 404', () => {
      it('throws error when task not exist', done => {
        server.inject({
          method: 'GET',
          url: '/tasks/id-not-exist'
        }, (res) => {
          expect(res.statusCode).to.eql(404);
          done();
        });
      });
    });
  });

  describe('PUT /tasks/:id', () => {
    describe('status 200', () => {
      it('updates a task', done => {
        server.inject({
          method: 'PUT',
          url: `/tasks/${tasks[0].id}`,
          payload: {
            name: 'travel a lot!',
            done: true
          }
        }, (res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.result.id).to.eql(tasks[0].id);
          expect(res.result.name).to.eql('travel a lot!');
          expect(res.result.done).to.eql(true);
          done();
        });
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    describe('status 204', () => {
      it('removes a task', done => {
        server.inject({
          method: 'DELETE',
          url: `/tasks/${tasks[0].id}`
        }, (res) => {
          expect(res.statusCode).to.eql(204);
          done();
        });
      });
    });
  });
});
