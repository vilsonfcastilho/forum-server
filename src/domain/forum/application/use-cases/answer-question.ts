import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { type IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Either, right } from '@/core/either'

interface IAnswerQuestionUseCaseRequest {
  userId: string
  questionId: string
  content: string
}

type IAnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: IAnswersRepository) {}

  async execute({
    userId,
    questionId,
    content,
  }: IAnswerQuestionUseCaseRequest): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(userId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}
