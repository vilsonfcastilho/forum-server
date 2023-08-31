import { IPaginationParams } from '@/core/repositories/pagination-params'
import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: IQuestionAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Question | null> {
    const foundQuestion = this.items.find((item) => item.id.toString() === id)

    if (!foundQuestion) {
      return null
    }

    return foundQuestion
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const foundQuestion = this.items.find((item) => item.slug.text === slug)

    if (!foundQuestion) {
      return null
    }

    return foundQuestion
  }

  async findManyRecent({ page }: IPaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    this.items[questionIndex] = question
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    this.items.splice(questionIndex, 1)
    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
