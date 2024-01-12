import { User } from '../entities/User'

export class JwtService {
  async generateToken(user: User) {
    console.log(user)

    return 'token'
  }
}
