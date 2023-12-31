import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/test/repositories/in-memory-question-attachments-repository'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from '@/test/factories/make-question'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let getQuestionBySlug: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    getQuestionBySlug = new GetQuestionBySlugUseCase(
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('question-title'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await getQuestionBySlug.execute({
      slug: 'question-title',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
