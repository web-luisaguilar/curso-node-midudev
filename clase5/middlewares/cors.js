import cors from 'cors'

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:1234',
        'https://movies.com',
        'https://luisaguilar.netlify.app',
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
