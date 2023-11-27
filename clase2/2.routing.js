const http = require('node:http')
const port = 3000

const procesesRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      res.end('HOLA MUNDO')
      return
    case 'POST':
      return
    case 'PUT':
      return
    case 'DELETE':
      return
    default:
      console.log('Request Received')
  }
}

const server = http.createServer(procesesRequest)

server.listen(port, () => {
  console.log(`Server listed on http://localhost:${port}`)
})
