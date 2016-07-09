describe('Routes: Tasks', () => {

  const tasks = [
    { id: '1', name: 'study hard!', done: false },
    { id: '2', name: 'work soft!', done: false }
  ];

  before(done => {
    r.connect(config.rethinkdb).then(conn => {
      r.tableCreate('tasks').run(conn, done);
    });
  });

  after(done => {
    r.connect(config.rethinkdb).then(conn => {
      r.tableDrop('tasks').run(conn, done);
    });
  });

  beforeEach(done => {
    r.connect(config.rethinkdb).then(conn => {
      r.table('tasks').delete().run(conn, () => {
        r.table('tasks').insert(tasks).run(conn, done);
      });
    });
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
            expect(res.body.done).to.be.false;
            done(err);
          });
      });
    });
  });

  describe('GET /tasks/:id', () => {
    describe('status 200', () => {
      it('returns one task', done => {
        request.get(`/tasks/${tasks[0].id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.id).to.eql(tasks[0].id);
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
          .end((err, res) => done(err));
      });
    });
  });

  describe('PUT /tasks/:id', () => {
    describe('status 200', () => {
      it('updates a task', done => {
        request.put(`/tasks/${tasks[0].id}`)
          .send({ name: 'travel a lot!', done: true })
          .expect(200)
          .end((err, res) => {
            expect(res.body.id).to.eql(tasks[0].id);
            expect(res.body.name).to.eql('travel a lot!');
            expect(res.body.done).to.be.true;
            done(err);
          });
      });
    });
  });

  describe('DELETE /tasks/:id', () => {
    describe('status 204', () => {
      it('removes a task', done => {
        request.delete(`/tasks/${tasks[0].id}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
});
