import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface IDomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
