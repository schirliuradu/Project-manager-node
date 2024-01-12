import { Repository } from 'typeorm'
import { User } from '../entities/User'
import emitter from '../utils/events/global-event-emitter'
import { RegisterRequestDto } from '../http/requests/register-request-dto'
import { UserCreated } from '../events/UserCreated'

export class UserService {
  constructor(private readonly repository: Repository<User>) {}

  async createUser(dto: RegisterRequestDto) {
    const user = new User()

    Object.assign(user, dto)

    await this.repository.save(user)

    emitter.emit(UserCreated.event, new UserCreated(user))

    return user
  }
}
