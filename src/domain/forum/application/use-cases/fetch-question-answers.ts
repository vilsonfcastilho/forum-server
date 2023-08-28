import { type IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface IFetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface IFetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionAnswersUseCaseRequest): Promise<IFetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
