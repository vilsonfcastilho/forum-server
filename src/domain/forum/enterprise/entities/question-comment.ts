import {
  Comment,
  ICommentProps,
} from '@/domain/forum/enterprise/entities/comment'
import { type UniqueEntityId } from '@/core/entities/unique-entity-id'
import { type Optional } from '@/core/types/optional'

export interface IQuestionCommentProps extends ICommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<IQuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questioncomment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questioncomment
  }
}
