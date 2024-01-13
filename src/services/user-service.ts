import { Repository } from 'typeorm'
import { User } from '../entities/User'
import { UserDto } from '../kafka/dto/user/user-dto'

export class UserService {
  constructor(private readonly repository: Repository<User>) {}

  async createUser(dto: UserDto) {
    const user = new User()

    Object.assign(user, dto)

    return this.repository.save(user)
  }
}
