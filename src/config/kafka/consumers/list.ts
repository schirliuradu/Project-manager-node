import { Db } from '../../db/database'
import { User } from '../../../entities/User'
import { UserService } from '../../../services/user-service'
import { Registry } from '../../../utils/kafka/schema-registry/registry'
import { UserCreatedHandler } from '../../../kafka/handlers/user-created-handler'
import { schemaRegistryInstance } from '../../../utils/kafka/schema-registry/schema-registry-instance'

export const consumers = [
  {
    topic: 'user-created',
    handler: new UserCreatedHandler(new UserService(Db.getRepository(User)), new Registry(schemaRegistryInstance)),
  },
  // add other topic with handlers here
]
