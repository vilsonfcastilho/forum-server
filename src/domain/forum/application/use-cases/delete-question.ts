import { Either, left, right } from '@/core/either'
import { type IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface IDeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type IDeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const foundQuestion = await this.questionsRepository.findById(questionId)

    if (!foundQuestion) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== foundQuestion.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(foundQuestion)

    return right({})
  }
}
