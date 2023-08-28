import { Entity } from '@/core/entities/entity'
import { type UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface ICommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<
  Props extends ICommentProps,
> extends Entity<Props> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
