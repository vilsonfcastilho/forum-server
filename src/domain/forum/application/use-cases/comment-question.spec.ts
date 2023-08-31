import { CommentQuestionUseCase } from '@/domain/forum/application/use-cases/comment-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from '@/test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachments-repository'
import { makeQuestion } from '@/test/factories/make-question'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let commentQuestion: CommentQuestionUseCase

describe('Comment question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    commentQuestion = new CommentQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await commentQuestion.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'Test content',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Test content',
    )
  })
})
