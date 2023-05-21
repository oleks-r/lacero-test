const MicroMQ = require('micromq')

const microservice = new MicroMQ({
  name: 'notification',
  rabbit: {
    url: 'amqp://guest:guest@localhost:5672',
  },
})

microservice.post('/feed', (req, res) => {
  const taskId = req.body.taskId
  res.json({
    taskId: taskId,
    result: {
      feed: 'feed with some info'
    }
  })
})

microservice.post('/send', (req, res) => {
  const taskId = req.body.taskId
  res.json({
    taskId: taskId,
    result: {
      sent: true,
    }
  })
})

microservice.start()