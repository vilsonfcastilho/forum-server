import { type IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

interface IFetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface IFetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: IFetchQuestionCommentsUseCaseRequest): Promise<IFetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}
