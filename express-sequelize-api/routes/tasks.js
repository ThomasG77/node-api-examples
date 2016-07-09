module.exports = app => {
  const Tasks = app.models.tasks;

  app.get('/tasks', (req, res) => {
    Tasks.findAll({})
      .then(tasks => res.json(tasks))
      .error(err => res.status(412).json(err))
    ;
  });

  app.get('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    Tasks.findById(taskId)
      .then(task => {
        if (task) {
          return res.json(task);
        }
        return res.status(404).end();
      })
      .error(err => res.status(412).json(err))
    ;
  });

  app.post('/tasks', (req, res) => {
    const task = req.body;
    Tasks.create(task)
      .then(newTask => res.json(newTask))
      .error(err => res.status(412).json(err))
    ;
  });

  app.put('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    const task = req.body;
    Tasks.update(task, { where: { id: taskId } })
      .then(() => {
        Tasks.findById(+taskId)
          .then(newTask => res.json(newTask))
          .error(err => res.status(412).json(err))
        ;
      })
      .error(err => res.status(412).json(err))
    ;
  });

  app.delete('/tasks/:taskId', (req, res) => {
    const { taskId } = req.params;
    Tasks.destroy({ where: { id: taskId } })
      .then(() => res.status(204).end())
      .error(err => res.status(412).json(err))
    ;
  });
};
