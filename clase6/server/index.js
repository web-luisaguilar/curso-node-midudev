import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import mysql from 'mysql2/promise'

const port = process.env.PORT ?? 3000

const configDB = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'chat_curso_midu',
}

const connection = await mysql.createConnection(configDB)
console.log('Database is connected!')

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: { maxDisconnectionDuration: 4000 },
})

io.on('connection', (socket) => {
  console.log('a user has connected!')

  socket.on('chat message', async (msg) => {
    try {
      let result
      result = await connection.query(
        'INSERT INTO messages (conent) VALUES (?)',
        [msg]
      )
      console.log(result)
    } catch (e) {
      console.log(e)
    }
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user has ben disconnected!')
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Server Listen on http://localhost:${port}`)
})
