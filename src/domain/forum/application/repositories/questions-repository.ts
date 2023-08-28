import { type IPaginationParams } from '@/core/repositories/pagination-params'
import { type Question } from '@/domain/forum/enterprise/entities/question'

export interface IQuestionsRepository {
  findById: (id: string) => Promise<Question | null>
  findBySlug: (slug: string) => Promise<Question | null>
  findManyRecent: (params: IPaginationParams) => Promise<Question[]>
  save: (question: Question) => Promise<void>
  create: (question: Question) => Promise<void>
  delete: (question: Question) => Promise<void>
}
