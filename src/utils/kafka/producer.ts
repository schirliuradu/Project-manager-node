import { Producer } from 'kafkajs'

export class KafkaProducer {
  constructor(private readonly producer: Producer) {
    this.producer = producer
  }

  async publishMessage(topic: string, message: object) {
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    })
  }

  async connect() {
    await this.producer.connect()
  }

  async disconnect() {
    await this.producer.disconnect()
  }
}
