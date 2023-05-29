const MicroMQ = require('micromq')

const microservice = new MicroMQ({
  name: 'serviceB',
  rabbit: {
    url: 'amqp://guest:guest@localhost:5672',
  },
})

const chain = {
  async put(action, data) {
    //put some data with action & taskId
    return true
  },
  async get(action, data) {
    //get result for action & taskId if we already did this step before
    if(data.taskId === 1) return true
    else return false
  },
  async matchTaskIdToBlock(taskId) {
    return
  },
}

microservice.action('checkApproved', async (meta, res) => {
  let response = await chain.get('checkApproved', meta)
  if(!response) {
    response = await chain.put('checkApproved', meta)
  }
  res.json({
    approved: response
  })
})

microservice.action('approve', async (meta, res) => {
  let response = await chain.get('approve', meta)
  if(!response) {
    response = await chain.put('approve', meta)
  }
  res.json({
    approved: response
  })
})

microservice.action('getBalance', async (meta, res) => {
  let response = await chain.get('getBalance', meta)
  res.json({
    balance: response
  })
})

microservice.action('feed', async (meta, res) => {
  let response = await chain.get('feed', meta)
  if(!response) {
    response = await chain.put('feed', meta)
  }
  res.json({
    amount: meta.amount,
    fed: response
  })
})

microservice.action('sign', async (meta, res) => {
  let response = await chain.get('sign', meta)
  if(!response) {
    response = await chain.put('sign', meta)
  }
  res.json({
    signed: response
  })
})

microservice.action('send', async (meta, res) => {
  let response = await chain.get('send', meta)
  if(!response) {
    response = await chain.put('send', meta)
  }
  res.json({
    sent: response
  })
})

microservice.start()