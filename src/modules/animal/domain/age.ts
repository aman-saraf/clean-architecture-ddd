import { Guard } from "@shared/core/Guard";
import { Result } from "@shared/core/Result";
import { ValueObject } from "@shared/domain/ValueObject";


interface AgeProps {
  value: number
}

export class Age extends ValueObject<AgeProps> {

  private static minimumAge: number = 0;

  get value(): number {
    return this.props.value;
  }

  private constructor(props: AgeProps) {
    super(props)
  }

  public static create(props: AgeProps): Result<Age> {

    const ageResult = Guard.againstNullOrUndefined(props.value, 'age')

    if (ageResult.isFailure) {
      return Result.fail<Age>(ageResult.getErrorValue())
    }

    const minimumAgeResult = Guard.greaterThan(this.minimumAge, props.value)
    if (minimumAgeResult.isFailure) {
      return Result.fail<Age>(minimumAgeResult.getErrorValue())
    }

    return Result.ok<Age>(new Age(props));
  }

}