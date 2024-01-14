import { describe } from 'node:test'
import { KafkaMessage } from 'kafkajs'
import { UserService } from '../../../../src/services/user-service'
import { Registry } from '../../../../src/utils/kafka/schema-registry/registry'
import { UserCreatedHandler } from '../../../../src/kafka/handlers/user-created-handler'

describe('user created handler', () => {
  afterEach(() => jest.clearAllMocks())

  it('should create user dto from message and create user', async () => {
    const dto = {
      email: 'john.doe@test.com',
      original_id: 123,
    }

    const userServiceMock = {
      createUser: jest.fn().mockImplementationOnce((dto) =>
        Promise.resolve({
          ...dto,
          id: 1,
        }),
      ),
    } as unknown as UserService

    const registryMock = {
      decode: jest.fn().mockImplementationOnce(() => Promise.resolve(dto)),
    } as unknown as Registry

    const handler = new UserCreatedHandler(userServiceMock, registryMock)

    const result = await handler.handle(dto as unknown as KafkaMessage)

    expect(result).toEqual({
      ...dto,
      id: 1,
    })
  })

  it('should catch errors and log them', async () => {
    const dto = {
      email: 'john.doe@test.com',
      original_id: 123,
    }

    const userServiceMock = { createUser: jest.fn() } as unknown as UserService

    const registryMock = {
      decode: jest.fn().mockImplementationOnce(() => {
        throw new Error('Error decoding kafka message value')
      }),
    } as unknown as Registry

    // @ts-ignore
    const consoleLogSpy = jest.spyOn(console, 'log')

    const handler = new UserCreatedHandler(userServiceMock, registryMock)

    await handler.handle(dto as unknown as KafkaMessage)

    expect(userServiceMock.createUser).not.toHaveBeenCalled()
    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
  })
})
