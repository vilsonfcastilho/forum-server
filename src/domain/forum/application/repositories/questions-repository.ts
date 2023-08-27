import { type Question } from '@/domain/forum/enterprise/entities/question'

export interface IQuestionsRepository {
  findById: (id: string) => Promise<Question | null>
  findBySlug: (slug: string) => Promise<Question | null>
  create: (answer: Question) => Promise<void>
  delete: (question: Question) => Promise<void>
}
