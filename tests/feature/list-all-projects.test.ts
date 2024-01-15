import app from '../../src/app'
const request = require('supertest')
import { Db } from '../../src/config/db/database'
import { Project } from '../../src/entities/Project'
import { JwtService } from '../../src/services/jwt-service'

describe('GET /api/projects', () => {
  beforeAll(async () => {
    await Db.initialize()
  })

  afterEach(async () => {
    await Db.synchronize(true)
  })

  it('should respond with 401 code if no bearer provided', async () => {
    request(app).get('/api/projects').expect(401)
  })

  it('responds with an empty json body if no projects were still stored', async () => {
    bypassJwtAuthMiddleware()

    return request(app)
      .get('/api/projects')
      .set('Authorization', 'Bearer token')
      .expect('Content-Type', /json/)
      .expect(200, [])
  })

  it('responds returns all projects', async () => {
    bypassJwtAuthMiddleware()

    const projects = [
      { id: 1, title: 'Project 1', slug: 'project-1', description: 'Project 1 description', status: 'open' },
      { id: 2, title: 'Project 2', slug: 'project-2', description: 'Project 2 description', status: 'open' },
    ]

    const repository = Db.getRepository(Project)

    for (const project of projects) {
      await repository.save(project)
    }

    const response = await request(app).get('/api/projects').set('Authorization', 'Bearer token')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(projects.length)
    expect(response.body[0].id).toEqual(projects[0].id)
    expect(response.body[1].id).toEqual(projects[1].id)
  })
})

const bypassJwtAuthMiddleware = () => {
  // bypass bearer auth middleware
  // @ts-ignore
  jest.spyOn(JwtService.prototype, 'verifyToken').mockReturnValueOnce(true)
}
