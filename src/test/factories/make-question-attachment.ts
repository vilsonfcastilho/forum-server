import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  IQuestionAttachmentProps,
  QuestionAttachment,
} from '@/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachment(
  override: Partial<IQuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionattachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return questionattachment
}
