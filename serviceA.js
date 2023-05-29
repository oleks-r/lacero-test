const MicroMQ = require('micromq')

const microservice = new MicroMQ({
  name: 'serviceA',
  rabbit: {
    url: 'amqp://guest:guest@localhost:5672',
  },
  microservices: ['serviceB'],
})

microservice.post('/service_a', async (req, res) => {
  const taskId = req.body.taskId || 1
  const command = req.body.command || 'businessCase1'
  const address = req.body.payload?.address || 'address1'

  let result
  switch(command){
    case 'businessCase1':
      result = await businessCase1(address, taskId)
      break
    default:
      result = 'failed'
  }

  res.json({
    taskId: taskId,
    result: {
      [command]: `${result} for ${address}`
    }
  })
})

async function businessCase1(address, task) {
  const approvedRes = await microservice.ask('serviceB', {
    server: { 
      action: 'checkApproved',
      meta: {
        param: '123',
        taskId: task,
      }
    },
  })

  const isApproved = approvedRes?.response?.approved
  if (!isApproved) {
    await microservice.ask('serviceB', {
      server: { 
        action: 'approve',
        meta: {
          param: '123',
          taskId: task,
        }
      },
    })
  }

  const balanceRes = await microservice.ask('serviceB', {
    server: { 
      action: 'getBalance',
      meta: {
        address: address,
        taskId: task,
      }
    },
  })
  const { balance } = balanceRes?.response

  if (balance < 5) {
    await microservice.ask('serviceB', {
      server: { 
        action: 'feed',
        meta: {
          address: address,
          amount: 5 - balance,
          taskId: task,
        }
      },
    })
  }

  const signatureRes = await microservice.ask('serviceB', {
    server: { 
      action: 'sign',
      meta: {
        taskId: task,
      }
    },
  })
  const { signature } = signatureRes?.response

  const sendRes = await microservice.ask('serviceB', {
    server: { 
      action: 'send',
      meta: {
        taskId: task,
        address: address,
        signature: signature,
      }
    },
  })
  const { sent } = sendRes?.response
  
  return sent
}

microservice.start()
