import { UserDto } from '../../../src/kafka/dto/user/user-dto'
import { UserService } from '../../../src/services/user-service'

describe('UserService', () => {
  afterEach(() => jest.clearAllMocks())

  it('should create a new user', async () => {
    const user = {
      email: 'john.doe@test.com',
      original_id: 123,
    }

    const repositoryMock = {
      save: jest.fn().mockImplementationOnce((user) => Promise.resolve(user)),
    } as any

    const service = new UserService(repositoryMock as any)

    const result = await service.createUser(user as UserDto)

    expect(result).toEqual(user)
  })
})
