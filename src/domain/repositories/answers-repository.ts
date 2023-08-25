import { type Answer } from '../entities/answer'

export interface IAnswersRepository {
  create: (answer: Answer) => Promise<void>
}
