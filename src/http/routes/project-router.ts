import express from 'express'
import { Db } from '../../utils/db/database'
import { Project } from '../../entities/Project'
import { ProjectService } from '../../services/project-service'
import { ProjectController } from '../controllers/project-controller'
import { validateRequest } from '../middlewares/validation-middleware'
import { CreateProjectRequestDto } from '../requests/create-project-request-dto'

const router = express.Router()

const projectController = new ProjectController(new ProjectService(Db.getRepository(Project)))

router.get('/', projectController.getProjects.bind(projectController))
router.get('/:project', projectController.findProject.bind(projectController))
router.post(
  '/',
  (req, res, next) => validateRequest(CreateProjectRequestDto, req, res, next),
  projectController.createProject.bind(projectController),
)
router.delete('/projects/:project', projectController.deleteProject.bind(projectController))

export default router
