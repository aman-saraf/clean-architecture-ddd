import { Result } from '@shared/core/Result';
import { UseCaseError } from '@shared/core/UseCaseError';

export namespace GetBreedForAnimalTypeErrors {
  export class CorruptAnimalTypeError extends Result<UseCaseError> {
    constructor(animalType: string) {
      super(false, {
        message: `animal type not found for: ${animalType}`
      });
    }
  }
}
