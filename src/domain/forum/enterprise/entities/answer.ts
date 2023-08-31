import { Entity } from '@/core/entities/entity'
import { type UniqueEntityId } from '@/core/entities/unique-entity-id'
import { type Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list'

export interface IAnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<IAnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  static create(
    props: Optional<IAnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }
}
