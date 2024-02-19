import { Result } from '@shared/core/Result';
import { UseCaseError } from '@shared/core/UseCaseError';

export namespace GetAllAnimalTypeErrors {
  export class AnimalTypeNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'No animal type entities found'
      });
    }
  }
}
