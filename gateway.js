const Gateway = require('micromq/gateway')

const gateway = new Gateway({
  microservices: ['serviceA', 'serviceB'],
  rabbit: {
    url: 'amqp://guest:guest@localhost:5672',
  },
})

gateway.post(['/command'], async (req, res) => {
  const command = req.body.command

  if(command) {
    res.req.url = `/service_a`
    await res.delegate('serviceA')
  } else {
    res.status(400).json({
      error: 'command absent or not recognized',
    })
    return
  }
})

gateway.get(['/close'], async () => {
  process.exit()
})

gateway.listen(process.env.PORT)
