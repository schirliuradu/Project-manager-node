import { User } from '../entities/User'

export class UserCreated {
  static readonly event = Symbol('UserCreated')

  constructor(public readonly user: User) {}
}
