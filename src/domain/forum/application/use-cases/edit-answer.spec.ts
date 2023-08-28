import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let editAnswer: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    editAnswer = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await editAnswer.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'Test content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Test content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return editAnswer.execute({
        authorId: 'author-2',
        answerId: newAnswer.id.toString(),
        content: 'Test content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
