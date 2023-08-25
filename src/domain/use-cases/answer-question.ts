import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../entities/answer'
import { type IAnswersRepository } from '../repositories/answers-repository'

interface IAnswerQuestionUseCaseRequest {
  userId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: IAnswersRepository) {}

  async execute({
    userId,
    questionId,
    content,
  }: IAnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityId(userId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
