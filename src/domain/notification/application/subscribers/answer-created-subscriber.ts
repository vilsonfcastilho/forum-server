import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

export class AnswerCreatedSubscriber implements EventHandler {
  constructor(
    private questionRepository: IQuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  public async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `New answer on "${question.title
          .substring(0, 20)
          .concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}
