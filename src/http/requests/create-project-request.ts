import { Request } from 'express'

export type CreateProjectRequest = Request & {
  body: {
    title: string
    description: string
    status: string
  }
}
