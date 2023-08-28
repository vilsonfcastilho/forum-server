import { type IPaginationParams } from '@/core/repositories/pagination-params'
import { type Answer } from '@/domain/forum/enterprise/entities/answer'

export interface IAnswersRepository {
  findById: (id: string) => Promise<Answer | null>
  findManyByQuestionId: (
    questionId: string,
    params: IPaginationParams,
  ) => Promise<Answer[]>
  save: (answer: Answer) => Promise<void>
  create: (answer: Answer) => Promise<void>
  delete: (answer: Answer) => Promise<void>
}
