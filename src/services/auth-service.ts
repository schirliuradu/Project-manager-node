import { JwtService } from './jwt-service'
import { UserService } from './user-service'
import { RegisterRequestDto } from '../http/requests/register-request-dto'

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterRequestDto) {
    const user = await this.userService.createUser(dto)

    return { user, token: await this.jwtService.generateToken(user) }
  }
}
