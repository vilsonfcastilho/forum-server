import { Either, left, right } from '@/core/either'
import { type IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { type IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface IEditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentIds: string[]
}

type IEditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerAttachmentsRepository: IAnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentIds,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
