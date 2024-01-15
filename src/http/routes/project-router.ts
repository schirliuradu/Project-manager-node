import express from 'express'
import { Db } from '../../config/db/database'
import { Project } from '../../entities/Project'
import { ProjectService } from '../../services/project-service'
import { CreateProjectDto } from '../requests/dto/create-project-dto'
import { ProjectController } from '../controllers/project-controller'
import { validateRequest } from '../middlewares/validation-middleware'
import { jwtAuthMiddleware } from '../middlewares/jwt-auth-middleware'

const router = express.Router()

const projectController = new ProjectController(new ProjectService(Db.getRepository(Project)))

router.get(
  '/',
  (req, res, next) => jwtAuthMiddleware(req, res, next),
  projectController.getProjects.bind(projectController),
)

router.get(
  '/:project',
  (req, res, next) => jwtAuthMiddleware(req, res, next),
  projectController.findProject.bind(projectController),
)

router.post(
  '/',
  (req, res, next) => jwtAuthMiddleware(req, res, next),
  (req, res, next) => validateRequest(CreateProjectDto, req, res, next),
  projectController.createProject.bind(projectController),
)

router.delete('/:project', projectController.deleteProject.bind(projectController))

export default router
