import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements INotificationsRepository
{
  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    const foundNotification = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!foundNotification) {
      return null
    }

    return foundNotification
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[notificationIndex] = notification
  }
}
