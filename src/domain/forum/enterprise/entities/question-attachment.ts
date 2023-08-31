import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface IQuestionAttachmentProps {
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class QuestionAttachment extends Entity<IQuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: IQuestionAttachmentProps, id?: UniqueEntityId) {
    const attachment = new QuestionAttachment(props, id)

    return attachment
  }
}
