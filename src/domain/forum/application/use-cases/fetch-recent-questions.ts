import { type IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface IFetchRecentQuestionsUseCaseRequest {
  page: number
}

interface IFetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private readonly questionsRepository: IQuestionsRepository) {}

  async execute({
    page,
  }: IFetchRecentQuestionsUseCaseRequest): Promise<IFetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
