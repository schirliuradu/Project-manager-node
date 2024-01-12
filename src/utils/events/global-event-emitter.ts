import EventEmitter from 'events'
import { UserCreatedListener } from '../../listeners/UserCreatedListener'
import { UserCreated } from '../../events/UserCreated'

const emitter = new EventEmitter()

emitter.on(UserCreated.event, new UserCreatedListener().onUserCreated)

export default emitter
