import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = []

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

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    )

    this.items.splice(questionIndex, 1)
  }
}
