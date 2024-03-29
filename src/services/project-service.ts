import { Repository } from 'typeorm'
import { Project } from '../entities/Project'
import { CreateProjectDto } from '../http/requests/dto/create-project-dto'

export class ProjectService {
  constructor(private readonly projectRepository: Repository<Project>) {}

  async getProjects(): Promise<Project[]> {
    return this.projectRepository.find()
  }

  async deleteProject(project: Project): Promise<void> {
    await this.projectRepository.softRemove(project)
  }

  async findProject(id: number): Promise<Project | null> {
    return this.projectRepository.findOneBy({ id: id })
  }

  async createProject(data: CreateProjectDto) {
    const project = new Project()

    Object.assign(project, data)

    return this.projectRepository.save(project)
  }
}
