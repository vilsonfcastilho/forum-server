import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { IDomainEvent } from '@/core/events/domain-event'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class QuestionBestAnswerChosenEvent implements IDomainEvent {
  public question: Question
  public bestAnswerId: UniqueEntityId
  public ocurredAt: Date

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id
  }
}
