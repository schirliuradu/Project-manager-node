import { describe } from 'node:test'
import { Project } from '../../../src/entities/Project'
import { ProjectService } from '../../../src/services/project-service'

describe('ProjectService', () => {
  it('should return all projects', async () => {
    const mockedResults = [
      { id: 1, title: 'Project 1', slug: 'project-1', description: 'Project 1 description' },
      { id: 2, title: 'Project 2', slug: 'project-2', description: 'Project 2 description' },
      { id: 3, title: 'Project 3', slug: 'project-3', description: 'Project 3 description' },
    ]

    const repositoryMock = {
      find: jest.fn().mockResolvedValueOnce(mockedResults),
    }

    const service = new ProjectService(repositoryMock as any)
    const projects = await service.getProjects()

    expect(projects).toEqual(mockedResults)
  })

  it('should delete a project from db', async () => {
    const repositoryMock = {
      softRemove: jest.fn(),
    }

    const service = new ProjectService(repositoryMock as any)
    const projectToBeDeleted = {
      id: 4,
      slug: 'project-4',
      title: 'Project 4',
      description: 'Project 4 description',
      status: 'open',
    } as Project

    await service.deleteProject(projectToBeDeleted)

    expect(repositoryMock.softRemove).toHaveBeenCalledTimes(1)
    expect(repositoryMock.softRemove).toHaveBeenCalledWith(projectToBeDeleted)
  })

  it('should find a project by id', async () => {
    const mockedResult = { id: 1, title: 'Project 1', slug: 'project-1', description: 'Project 1 description' }

    const repositoryMock = {
      findOneBy: jest.fn().mockResolvedValueOnce(mockedResult),
    }

    const service = new ProjectService(repositoryMock as any)
    const project = await service.findProject(1)

    expect(project).toEqual(mockedResult)
  })

  it('should create a project', async () => {
    const mockedResult = { id: 1, title: 'Project 1', slug: 'project-1', description: 'Project 1 description' }

    const repositoryMock = {
      save: jest.fn().mockResolvedValueOnce(mockedResult),
    }

    const service = new ProjectService(repositoryMock as any)
    const project = await service.createProject({
      slug: 'project-1',
      title: 'Project 1',
      description: 'Project 1 description',
    } as Project)

    expect(project).toEqual(mockedResult)
  })
})
