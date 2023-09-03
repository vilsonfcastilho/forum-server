import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { IDomainEvent } from '@/core/events/domain-event'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class AnswerCreatedEvent implements IDomainEvent {
  public answer: Answer
  public ocurredAt: Date

  constructor(answer: Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
