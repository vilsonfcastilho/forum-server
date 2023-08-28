import { IPaginationParams } from '@/core/repositories/pagination-params'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements IAnswersRepository {
  public items: Answer[] = []

  async findById(id: string): Promise<Answer | null> {
    const foundAnswer = this.items.find((item) => item.id.toString() === id)

    if (!foundAnswer) {
      return null
    }

    return foundAnswer
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: IPaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[answerIndex] = answer
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(answerIndex, 1)
  }
}
