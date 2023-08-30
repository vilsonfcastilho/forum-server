import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let editQuestion: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    editQuestion = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await editQuestion.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      title: 'Test title',
      content: 'Test content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Test title',
      content: 'Test content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await editQuestion.execute({
      authorId: 'author-2',
      questionId: newQuestion.id.toString(),
      title: 'Test title',
      content: 'Test content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
