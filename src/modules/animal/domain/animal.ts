import { Id } from '@common/domain/Id';
import { Name } from '@common/domain/Name';
import { Guard, GuardArgumentCollection } from '@shared/core/Guard';
import { Result } from '@shared/core/Result';
import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { User } from '@user/domain/user';
import { AnimalType } from './animalType';
import { Breed } from './breed';
import { Gender } from './gender';

interface AnimalProps {
  isPet: boolean;
  dateOfBirth?: Date;
  breed?: Breed;
  animalType: AnimalType;
  user: User;
  name?: Name;
  gender?: Gender;
}

export class Animal extends AggregateRoot<AnimalProps> {
  get animalId(): Id {
    return Id.create(this._id).getValue();
  }

  get isPet(): boolean {
    return this.props.isPet;
  }

  get dateOfBirth(): Date | undefined {
    return this.props.dateOfBirth;
  }

  get breed(): Breed | undefined {
    return this.props.breed;
  }

  get animalType(): AnimalType {
    return this.props.animalType;
  }

  get user(): User {
    return this.props.user;
  }

  get name(): Name | undefined {
    return this.props.name;
  }

  get gender(): Gender | undefined {
    return this.props.gender;
  }

  private constructor(props: AnimalProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: AnimalProps, id?: UniqueEntityId): Result<Animal> {

    const guardArguements: GuardArgumentCollection = [
      { argument: props.animalType, argumentName: 'animalType' },
      { argument: props.isPet, argumentName: 'isPet' },
      { argument: props.user, argumentName: 'user' }
    ]

    if (props.isPet) {
      guardArguements.push({ argument: props.breed, argumentName: 'breed' });
      guardArguements.push({ argument: props.name, argumentName: 'name' });
      guardArguements.push({ argument: props.gender, argumentName: 'gender' });
      guardArguements.push({ argument: props.dateOfBirth, argumentName: 'dateOfBirth' });
    }

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArguements);

    if (guardResult.isFailure) {
      return Result.fail<Animal>(guardResult.getErrorValue());
    }

    const defaultAnimalProps: AnimalProps = {
      ...props
    };

    const animal = new Animal(defaultAnimalProps, id);
    return Result.ok<Animal>(animal);
  }
}
