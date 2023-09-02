import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private id: string

  toString() {
    return this.id
  }

  toValue() {
    return this.id
  }

  constructor(id?: string) {
    this.id = id ?? randomUUID()
  }

  public equals(id: UniqueEntityId): boolean {
    return id.toValue() === this.id
  }
}
