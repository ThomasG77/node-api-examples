describe('Handler: Tasks', () => {

  const tasks = [
    { id: '1', name: 'study hard!', done: false },
    { id: '2', name: 'work soft!', done: false }
  ];

  before(done => {
    r.connect(config.rethinkdb, (err, conn) => {
      r.tableCreate('tasks').run(conn, done);
    });
  });

  after(done => {
    r.connect(config.rethinkdb, (err, conn) => {
      r.tableDrop('tasks').run(conn, done);
    });
  })

  beforeEach(done => {
    r.connect(config.rethinkdb, (err, conn) => {
      r.table('tasks').delete().run(conn, () => {
        r.table('tasks').insert(tasks).run(conn, done);
      });
    });
  });

  describe('GET /tasks', () => {
    describe('status 200', () => {
      it('returns a list of tasks', done => {
        server.inject({
          method: 'GET',
          url: '/tasks'
        }, function (res) {
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
            "name": "run fast!",
            "done": false
          }
        }, function (res) {
          expect(res.statusCode).to.eql(200);
          expect(res.result.name).to.eql('run fast!');
          expect(res.result.done).to.be.false;
          done();
        });
      });
    });
  });

  describe('GET /tasks/{id}', () => {
    describe('status 200', () => {
      it('returns one task', done => {
        server.inject({
          method: 'GET',
          url: `/tasks/${tasks[0].id}`
        }, function (res) {
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
        }, function (res) {
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
            "name": "travel a lot!",
            "done": true
          }
        }, function (res) {
          expect(res.statusCode).to.eql(200);
          expect(res.result.id).to.eql(tasks[0].id);
          expect(res.result.name).to.eql('travel a lot!');
          expect(res.result.done).to.be.true;
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
        }, function (res) {
          expect(res.statusCode).to.eql(204);
          done();
        });
      });
    });
  });
});
