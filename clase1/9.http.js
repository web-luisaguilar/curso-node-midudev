const http = require('node:http')

let server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

server.listen(0, () => {
  console.log(`server Ready on port http://localhost:${server.address().port}`)
})
