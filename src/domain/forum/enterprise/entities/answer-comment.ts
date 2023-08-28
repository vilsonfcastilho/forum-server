import {
  Comment,
  ICommentProps,
} from '@/domain/forum/enterprise/entities/comment'
import { type UniqueEntityId } from '@/core/entities/unique-entity-id'
import { type Optional } from '@/core/types/optional'

export interface IAnswerCommentProps extends ICommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<IAnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answercomment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answercomment
  }
}
