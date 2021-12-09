export abstract class ObjectAutoAssign<T> {
  constructor(props?: Partial<T>) {
    Object.assign(this, props)
  }
}
