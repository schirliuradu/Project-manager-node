const request = require('supertest')
const { app } = require('./../../src/app')
import { Db } from '../../src/config/db/database'
import { Project } from '../../src/entities/Project'

beforeAll(async () => {
  await Db.initialize()
})

afterEach(async () => {
  await Db.synchronize(true)
})

describe('GET /api/projects', () => {
  it('responds with an empty json body if no projects were still stored', async () => {
    return request(app).get('/api/projects').expect('Content-Type', /json/).expect(200, [])
  })

  it('responds returns all projects', async () => {
    const projects = [
      { id: 1, title: 'Project 1', slug: 'project-1', description: 'Project 1 description', status: 'open' },
      { id: 2, title: 'Project 2', slug: 'project-2', description: 'Project 2 description', status: 'open' },
    ]

    const repository = Db.getRepository(Project)

    for (const project of projects) {
      await repository.save(project)
    }

    const response = await request(app).get('/api/projects')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(projects.length)
    expect(response.body[0].id).toEqual(projects[0].id)
    expect(response.body[1].id).toEqual(projects[1].id)
  })
})
