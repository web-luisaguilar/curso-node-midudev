/* eslint-disable comma-dangle */
const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')
const app = express()
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'Hello world!' })
})

app.get('/movies', (req, res) => {
  res.json(movies)
})
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filterMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )

    res.json(filterMovies)
  }
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((el) => el.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not Found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  //! Realizar luego en Base de datos
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex < 0) {
    return res.status(404).json({ message: 'Movie Not Found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  }
  movies[movieIndex] = updateMovie
  return res.json(updateMovie)
})

app.listen(3000, () => {
  console.log('server listen on http://localhost:3000')
})
