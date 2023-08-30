import { Either, left, right } from '@/core/either'
import { type IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'

interface IDeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type IDeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const foundAnswer = await this.answersRepository.findById(answerId)

    if (!foundAnswer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== foundAnswer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(foundAnswer)

    return right({})
  }
}
