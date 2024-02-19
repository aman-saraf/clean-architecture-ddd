import { Id } from '@common/domain/Id';
import { Name } from '@common/domain/Name';
import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface AnimalTypeProps {
  name: Name;
}

export class AnimalType extends Entity<AnimalTypeProps> {
  get animalTypeId(): Id {
    return Id.create(this._id).getValue();
  }

  get name(): Name {
    return this.props.name;
  }

  private constructor(props: AnimalTypeProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: AnimalTypeProps, id?: UniqueEntityId): Result<AnimalType> {
    const guardResult = Guard.againstNullOrUndefinedBulk([{ argument: props.name, argumentName: 'name' }]);

    if (guardResult.isFailure) {
      return Result.fail<AnimalType>(guardResult.getErrorValue());
    }

    const defaultAnimalTypeProps: AnimalTypeProps = {
      ...props
    };

    const animalType = new AnimalType(defaultAnimalTypeProps, id);
    return Result.ok<AnimalType>(animalType);
  }
}
