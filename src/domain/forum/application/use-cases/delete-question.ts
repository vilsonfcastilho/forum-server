import { type IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

interface IDeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const foundQuestion = await this.questionsRepository.findById(questionId)

    if (!foundQuestion) {
      throw new Error('Question not found.')
    }

    if (authorId !== foundQuestion.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(foundQuestion)

    return {}
  }
}
