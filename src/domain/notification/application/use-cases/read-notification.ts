import { Either, left, right } from '@/core/either'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface IReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}

type IReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: IReadNotificationUseCaseRequest): Promise<IReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({
      notification,
    })
  }
}
