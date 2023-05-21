const MicroMQ = require('micromq')

const microservice = new MicroMQ({
  name: 'finance',
  rabbit: {
    url: 'amqp://guest:guest@localhost:5672',
  },
})

microservice.post('/sign', (req, res) => {
  const taskId = req.body.taskId
  res.json({
    taskId: taskId,
    result: {
      sign: 'signed'
    }
  })
})

microservice.post('/get_balance', (req, res) => {
  const taskId = req.body.taskId
  res.json({
    taskId: taskId,
    result: {
      balance: 999,
    }
  })
})

microservice.start()