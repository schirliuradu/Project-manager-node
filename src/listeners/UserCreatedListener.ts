import { UserCreated } from '../events/UserCreated'
import { KafkaProducer } from '../utils/kafka/producer'
import { Listenable } from './interfaces/listenable'

export class UserCreatedListener implements Listenable {
  constructor(private readonly producer: KafkaProducer) {}

  async handle(event: UserCreated) {
    try {
      await this.producer.publishMessage('user-created', {
        email: event.user.email,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
