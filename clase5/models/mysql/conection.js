import mysql from 'mysql'

export const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'moviesdb',
})

con.connect((err) => {
  if (err) throw err
  console.log('Mysql Connected!')
})
