import { type IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface IEditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface IEditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
