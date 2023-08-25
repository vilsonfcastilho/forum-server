import { AnswerQuestionUseCase } from './answer-question'
import { type IAnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRopository: IAnswersRepository = {
  create: async () => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRopository)

  const answer = await answerQuestion.execute({
    userId: '1',
    questionId: '1',
    content: 'New answer',
  })

  expect(answer.content).equal('New answer')
})
