import dotenv from 'dotenv'
dotenv.config() // setup env vars

import bodyParser from 'body-parser'
import express, { Application } from 'express'
import projectRouter from './http/routes/project-router'

const app: Application = express()

app.use(bodyParser.json())
app.use('/api/projects', projectRouter)

export default app
