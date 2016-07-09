module.exports = app => {
  const Tasks = app.models.tasks;

  app.get('/tasks', (req, res) => {
    Tasks.list((err, tasks) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(tasks);
    });
  });

  app.get('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    Tasks.get(taskId, (err, task) => {
      if (err) {
        if (err.notFound) {
          return res.status(404).end();
        }
        return res.status(412).json(err);
      }
      return res.json(task);
    });
  });

  app.post('/tasks', (req, res) => {
    const task = req.body;
    Tasks.insert(task, (err, newTask) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newTask);
    });
  });

  app.put('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    const task = req.body;
    Tasks.update(taskId, task, (err, newTask) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newTask);
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
