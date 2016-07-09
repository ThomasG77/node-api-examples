module.exports = app => {
  const Tasks = app.models.tasks;

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
    Tasks.findById(taskId, (err, task) => {
      if (err) {
        return res.status(412).json(err);
      }
      if (task) {
        return res.json(task);
      }
      return res.status(404).end();
    });
  });

  app.post('/tasks', (req, res) => {
    const task = req.body;
    Tasks.create(task, (err, newTask) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newTask);
    });
  });

  app.put('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    const task = req.body;
    Tasks.update({ _id: taskId }, { $set: task }, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      Tasks.findById(taskId, (findErr, newTask) => {
        if (findErr) {
          return res.status(412).json(err);
        }
        return res.json(newTask);
      });
      return true;
    });
  });

  app.delete('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    Tasks.findByIdAndRemove(taskId, (err) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  });
};
