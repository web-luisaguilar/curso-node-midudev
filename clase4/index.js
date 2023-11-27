import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
// import fs from 'node:fs'

// Una forma de hacer la importacion de un json
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// leer json en ESModules por ahora

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hello world!' })
})

app.use('/movies', moviesRouter)

app.listen(3000, () => {
  console.log('server listen on http://localhost:3000')
})
