import { type IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { type IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface IChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface IChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: IQuestionsRepository,
    private answersRepository: IAnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: IChooseQuestionBestAnswerUseCaseRequest): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
