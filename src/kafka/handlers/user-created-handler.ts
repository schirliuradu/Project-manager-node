import { KafkaMessage } from 'kafkajs'
import { UserDto } from '../dto/user/user-dto'
import { UserService } from '../../services/user-service'
import { KafkaHandler } from './interfaces/kafka-handler'
import { Registry } from '../../utils/kafka/schema-registry/registry'

export class UserCreatedHandler implements KafkaHandler {
  constructor(
    private readonly service: UserService,
    private readonly registry: Registry,
  ) {}

  async handle(message: KafkaMessage) {
    try {
      const userDto = <UserDto>await this.registry.decode(message)

      console.log(userDto)

      return this.service.createUser(userDto)
    } catch (error) {
      console.log(`Error during kafka consuming message: ${error}`)
    }
  }
}
