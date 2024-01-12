import express from 'express'
import { AuthController } from '../controllers/auth-controller'
import { AuthService } from '../../services/auth-service'
import { validateRequest } from '../middlewares/validation-middleware'
import { RegisterRequestDto } from '../requests/register-request-dto'
import { UserService } from '../../services/user-service'
import { User } from '../../entities/User'
import { JwtService } from '../../services/jwt-service'
import { Db } from '../../utils/db/database'

const router = express.Router()

const authController = new AuthController(new AuthService(new UserService(Db.getRepository(User)), new JwtService()))

router.post(
  '/register',
  (req, res, next) => validateRequest(RegisterRequestDto, req, res, next),
  authController.register.bind(authController),
)

export default router
