module.exports = app => {
  const Tasks = app.models.tasks.db({
    user: 'neo4j',
    pass: '123'  
  });

  app.get('/tasks', (req, res) => {
    Tasks.find({}, (err, tasks) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(tasks);
    });
  });

  app.get('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    Tasks.read(taskId, (err, task) => {
      if (err) {
        if(/Invalid ID/.test(err.stack)) {
          return res.status(404).end();
        }
        return res.status(412).json(err);
      }
      if (task) {
        return res.json(task);
      }
    });
  });

  app.post('/tasks', (req, res) => {
    const task = req.body;
    Tasks.save(task, (err, newTask) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newTask);
    });
  });

  app.put('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    const task = req.body;
    Tasks.read(taskId, (err, result) => {
      result = task;
      result.id = taskId;
      Tasks.save(result, (err, newTask) => {
        if (err) {
          return res.status(412).json(err);
        }
        return res.json(newTask);
      });
    });
  });

  app.delete('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    Tasks.delete(taskId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  });
};
