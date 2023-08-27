import { type Answer } from '@/domain/forum/enterprise/entities/answer'

export interface IAnswersRepository {
  create: (answer: Answer) => Promise<void>
}
