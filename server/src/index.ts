import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { connectDB } from './libs/db'

import authRoutes from '~/routes/auth.route'
import userRoutes from '~/routes/user.route'

import { responseMiddleware } from './middlewares/response.middleware'
import { errorMiddleware } from './middlewares/error.middleware'

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use(responseMiddleware)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
  connectDB()
})
