import { shallowEqual } from 'shallow-equal-object';

interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {

  public readonly props: T

  constructor(props: T) {
    this.props = props
  }

  public equals(vo?: ValueObject<T>) {

    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.props === undefined) {
      return false
    }

    return shallowEqual(this.props, vo.props)

  }

}