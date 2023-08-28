import { CommentAnswerUseCase } from '@/domain/forum/application/use-cases/comment-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'
import { makeAnswer } from '@/test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let commentAnswer: CommentAnswerUseCase

describe('Comment answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    commentAnswer = new CommentAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await commentAnswer.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Test content',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Test content',
    )
  })
})
