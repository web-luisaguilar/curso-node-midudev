import crypto from 'crypto'

import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
const { Schema } = new DBLocal({ path: './db' })
import { SALT_ROUNDS } from './config.js'

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
})
export class UserRepository {
  static async create({ username, password }) {
    // 1. Validaciones de username (opcional zod...)
    Validation.username(username)
    Validation.password(password)

    //2. Asegurarse de que el username no existe
    const user = User.findOne({ username })
    if (user) throw new Error('user already exists')

    const id = crypto.randomUUID()

    //! conversion de password a hash
    // const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS) //forma syncrona
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save()
    return id
  }

  static async login({ username, password }) {
    // 1. Validaciones de username (opcional zod...)
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('username does not exist')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('password is invalid')

    const { password: _, ...publicUser } = user
    return publicUser
  }
}

class Validation {
  static username(username) {
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('username must be at least 3 characters logn')
  }
  static password(password) {
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 6) throw new Error('username must be at least 6 characters logn')
  }
}
