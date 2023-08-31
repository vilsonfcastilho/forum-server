import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { type IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list'

interface IAnswerQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
  attachmentIds: string[]
}

type IAnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentIds,
  }: IAnswerQuestionUseCaseRequest): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    const answerAttachments = attachmentIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}
