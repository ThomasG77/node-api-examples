describe('Routes: Tasks', () => {

  const Tasks = app.models.tasks.db;

  let tasks = [
    { name: 'study hard!', done: false },
    { name: 'work soft!', done: false }
  ];

  let savedTasks = [];

  function clearTasks() {
    return new Promise((resolve, reject) => {
      Tasks.query('MATCH (n) DELETE n', (err, ok) => {
        err? reject(err) : resolve(ok);
      });
    });
  }

  before(done => {
    clearTasks()
      .then(() => {
        Tasks.save(tasks,(err, saved) => {
          savedTasks = saved;
          done();
        });
      })
      .catch(done);
  });

  after(done => {
    clearTasks()
      .then(() => done())
      .catch(done);
  });

  describe('GET /tasks', () => {
    describe('status 200', () => {
      it('returns a list of tasks', done => {
        request.get('/tasks')
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body).to.include(savedTasks[0]);
            expect(res.body).to.include(savedTasks[1]);
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
        request.get(`/tasks/${savedTasks[0].id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.id).to.eql(savedTasks[0].id);
            expect(res.body.name).to.eql(savedTasks[0].name);
            expect(res.body.done).to.eql(savedTasks[0].done);
            done(err);
          });
      });
    });
    describe('status 404', () => {
      it('throws error when task not exist', done => {
        request.get('/tasks/id-not-exist')
          .expect(404)
          .end(done);
      });
    });
  });

  describe('PUT /tasks/:id', () => {
    describe('status 200', () => {
      it('updates a task', done => {
        request.put(`/tasks/${savedTasks[0].id}`)
          .send({ name: 'travel a lot!', done: true })
          .expect(200)
          .end((err, res) => {
            expect(res.body.id).to.eql(`${savedTasks[0].id}`);
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
        request.delete(`/tasks/${savedTasks[0].id}`)
          .expect(204)
          .end(done);
      });
    });
  });
});
