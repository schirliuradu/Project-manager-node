import { UserCreated } from '../events/UserCreated'
export class UserCreatedListener {
  async onUserCreated(event: UserCreated) {
    console.log(event.user)
    console.log('-------')
    console.log('User was created, logging from the listener!')
  }
}
