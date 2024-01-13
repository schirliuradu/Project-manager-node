import dotenv from 'dotenv'
dotenv.config() // setup env vars

import bodyParser from 'body-parser'
import { Db } from './utils/db/database'
import express, { Application } from 'express'
import { producer } from './utils/kafka/instance'
import authRouter from './http/routes/auth-router'
import projectRouter from './http/routes/project-router'

export const app: Application = express()

app.use(bodyParser.json())

app.use('/api', authRouter)
app.use('/api/projects', projectRouter)

const port = process.env.PORT || 3000

app.listen(port, async () => {
  // avoid creating db connection in testing environment
  if (process.env.NODE_ENV !== 'test') {
    await Db.initialize()
    await producer.connect()
  }
})
