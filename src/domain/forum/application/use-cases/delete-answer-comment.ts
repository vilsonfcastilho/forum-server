import { Either, left, right } from '@/core/either'
import { type IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface IDeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type IDeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: IDeleteAnswerCommentUseCaseRequest): Promise<IDeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
