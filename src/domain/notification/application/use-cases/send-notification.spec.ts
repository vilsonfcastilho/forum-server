import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )
  })

  it('should be able to send a notification', async () => {
    const result = await sendNotificationUseCase.execute({
      recipientId: 'recipient-1',
      title: 'Test title',
      content: 'Test content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
