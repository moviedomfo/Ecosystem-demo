import {shallowEqual} from "shallow-equal-object";

/**
 * Value Object base class
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */
export abstract class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public equals(object?: ValueObject<T>): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof ValueObject)) {
      return false;
    }
    return shallowEqual(this._value, object._value);
    //return this._value === object._value;
  }

  get value(): T {
    return this._value;
  }
}
