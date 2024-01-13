import { Db } from '../../../config/db/database'

export const databaseConnection = async () => {
  await Db.initialize()
}
