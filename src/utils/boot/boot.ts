import { bootKafkaConsumers } from './kafka/consumers'
import { bootDatabaseConnection } from './db/boot-database-connection'

export const bootAppDependencies = async () => {
  // We don't want to boot the database connection and kafka consumers during tests
  // because we want to mock them instead
  if (process.env.NODE_ENV !== 'test') {
    await bootDatabaseConnection()
    await bootKafkaConsumers()
  }
}
