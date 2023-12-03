import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor({ movieModel }) {
    this.MovieModel = movieModel
  }
  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.MovieModel.getAll({ genre })

    //qué es lo que renderiza
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not Found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await this.MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.MovieModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    return res.json({ message: 'Movie deleted' })
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const updatedMovie = await this.MovieModel.update({
      id,
      input: result.data,
    })
    return res.json(updatedMovie)
  }
}
