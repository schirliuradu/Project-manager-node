import EventEmitter from 'events'
import { producer } from '../kafka/instance'
import { KafkaProducer } from '../kafka/producer'
import { UserCreated } from '../../events/user-created'
import { UserCreatedListener } from '../../listeners/user-created-listener'

const emitter = new EventEmitter()

// set other listeners
const userCreatedListener = new UserCreatedListener(new KafkaProducer(producer))

// set other event listeners
emitter.on(UserCreated.event, userCreatedListener.handle.bind(userCreatedListener))

export default emitter
