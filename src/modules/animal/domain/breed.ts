import { Id } from '@common/domain/Id';
import { Name } from '@common/domain/Name';
import { Guard } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AnimalType } from './animalType';

interface BreedProps {
  name: Name;
  animalType: AnimalType;
}

export class Breed extends Entity<BreedProps> {
  get breedId(): Id {
    return Id.create(this._id).getValue();
  }

  get name(): Name {
    return this.props.name;
  }

  get animalType(): AnimalType {
    return this.props.animalType;
  }

  private constructor(props: BreedProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: BreedProps, id?: UniqueEntityId): Result<Breed> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.animalType, argumentName: 'animalType' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Breed>(guardResult.getErrorValue());
    }

    const defaultBreedProps: BreedProps = {
      ...props
    };

    const breed = new Breed(defaultBreedProps, id);
    return Result.ok<Breed>(breed);
  }
}
