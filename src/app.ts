import dotenv from 'dotenv'
dotenv.config() // setup env vars

import bodyParser from 'body-parser'
import projectRoutes from './http/routes/project-router'
import express, { Application } from 'express'
import { Db } from './utils/db/database'

export const app: Application = express()

app.use(bodyParser.json())
app.use('/api/projects', projectRoutes)

const port = process.env.PORT || 3000

app.listen(port, async () => {
  // avoid creating db connection in testing environment
  if (process.env.NODE_ENV !== 'test') {
    await Db.initialize()
  }
})
