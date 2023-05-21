const Gateway = require('micromq/gateway')

const gateway = new Gateway({
  microservices: ['approvement', 'finance', 'notification'],
  rabbit: {
    url: 'amqp://guest:guest@localhost:5672',
  },
})

const microservices = {
  check_approved: 'approvement',
  approve: 'approvement',
  get_balance: 'finance',
  sign: 'finance',
  feed: 'notification',
  send: 'notification',
}

const camelToSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

gateway.post(['/command'], async (req, res) => {
  const command = camelToSnakeCase(req.body.command)
  
  if(command && microservices[command]) {
    res.req.url = `/${command}`
    await res.delegate(microservices[command])
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