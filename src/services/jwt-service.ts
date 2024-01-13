import { Repository } from 'typeorm'
import { User } from '../entities/User'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'

interface UserJwtPayload extends JwtPayload {
  userId: number
}

export class JwtService {
  constructor(private readonly userRepository: Repository<User>) {}

  async verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!, {}, async (err, decoded) => {
      if (err) {
        throw err
      }

      const decodedJwt = decoded as UserJwtPayload

      if (decodedJwt.userId) {
        const user = await this.userRepository.findOneBy({ original_id: decodedJwt.userId })

        if (!user) {
          throw new JsonWebTokenError('Jwt token invalid user provided!')
        }
      }

      return decoded
    })
  }
}
