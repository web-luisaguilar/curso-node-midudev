import { Router } from 'express'
import { readJSON } from '../utils.js'
import randomUUID from 'crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

const movies = readJSON('./movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filterMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )

    res.json(filterMovies)
  }
  res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((el) => el.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not Found' })
})

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  //! Realizar luego en Base de datos
  const newMovie = {
    id: randomUUID(),
    ...result.data,
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})

moviesRouter.patch('/:id', (req, res) => {
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
