import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'moviesdb',
}
const connection = await mysql.createConnection(config)
connection.connect((err) => {
  if (err) throw err
  console.log('Database is connected!')
})

export class MovieModel {
  static async getAll({ genre }) {
    // crear la parte de obtener todas las peliculas por genero

    const [movies] = await connection.query(
      'SELECT  BIN_TO_UUID(id) id, title,movie_year,director,duration,poster,rate FROM movie;'
    )
    return movies
  }
  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT  BIN_TO_UUID(id) id, title,movie_year,director,duration,poster,rate FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    if (movies.length === 0) return null
    return movies[0]
  }
  static async create({ input }) {
    const { title, year, director, duration, poster, rate } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    const result = await connection.query(
      `INSERT INTO movie(id,title,movie_year,director,duration,poster,rate) values(UUID_TO_BIN(?),?,?,?,?,?,?)
    ;`,
      [uuid, title, year, director, duration, poster, rate]
    )
    console.log(result)
    return result
  }
  static async delete({ id }) {
    const result = await connection.query(
      `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    console.log(result)
    return result
  }
  static async update({ id, input }) {
    const { title, year, director, duration, poster, rate } = input

    console.log(title)
    // const result = await connection.query(`UPDATE movie SET  WHERE id=UUID_TO_BIN(?)`, [id])
    // console.log(result)
    // return result
  }
}
