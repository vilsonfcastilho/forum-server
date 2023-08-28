import { type IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { type IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface ICommentQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface ICommentQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: ICommentQuestionUseCaseRequest): Promise<ICommentQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
