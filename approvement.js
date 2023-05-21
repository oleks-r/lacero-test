const MicroMQ = require('micromq')

const microservice = new MicroMQ({
  name: 'approvement',
  rabbit: {
    url: 'amqp://guest:guest@localhost:5672',
  },
})

microservice.post('/approve', (req, res) => {
  const taskId = req.body.taskId
  res.json({
    taskId: taskId,
    result: {
      approve: 'done'
    }
  })
})

microservice.post('/check_approved', (req, res) => {
  const taskId = req.body.taskId
  res.json({
    taskId: taskId,
    result: {
      checked: true,
    }
  })
})

microservice.start()