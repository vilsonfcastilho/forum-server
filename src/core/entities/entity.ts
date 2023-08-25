import { UniqueEntityId } from './unique-entity-id'

export class Entity<Props> {
  private readonly _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }
}