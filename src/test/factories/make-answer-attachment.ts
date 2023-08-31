import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  IAnswerAttachmentProps,
  AnswerAttachment,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override: Partial<IAnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerattachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answerattachment
}
