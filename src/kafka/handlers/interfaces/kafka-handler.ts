import { KafkaMessage } from 'kafkajs'

export interface KafkaHandler {
  handle(message: KafkaMessage): void
}
