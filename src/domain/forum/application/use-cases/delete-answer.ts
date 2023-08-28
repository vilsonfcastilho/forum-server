import { type IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface IDeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface IDeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: IAnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const foundAnswer = await this.answersRepository.findById(answerId)

    if (!foundAnswer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== foundAnswer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(foundAnswer)

    return {}
  }
}
