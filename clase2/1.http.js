/* eslint-disable comma-dangle */
'use strict'

const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received: ', req.url)
  if (req.url === '/') {
    const data = {
      hello: 'test',
      tem: '23',
    }
    res.statusCode = 200
    res.setHeader('Conent-Type', 'text/json')
    res.end(data)
  }
})

server.listen(desiredPort, () => {
  console.log(`Server ready on http://localhost:${desiredPort}`)
})
