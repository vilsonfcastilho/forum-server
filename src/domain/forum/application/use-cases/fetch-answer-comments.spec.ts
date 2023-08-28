import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let fetchAnswerComments: FetchAnswerCommentsUseCase

describe('Fetch answer comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    fetchAnswerComments = new FetchAnswerCommentsUseCase(
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )

    const { answerComments } = await fetchAnswerComments.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
        }),
      )
    }

    const { answerComments } = await fetchAnswerComments.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
