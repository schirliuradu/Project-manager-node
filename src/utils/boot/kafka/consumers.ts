import { consumer } from '../../kafka/broker/kafka-instance'
import { consumers } from '../../../config/kafka/consumers/list'

export const bootKafkaConsumers = async () => {
  consumers.map(async (item) => {
    const { topic, handler } = item

    await consumer.subscribe({ topic })

    await consumer.run({
      autoCommitInterval: 500,
      eachMessage: async ({ message }) => {
        await handler.handle(message)
      },
    })
  })
}
