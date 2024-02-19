import { AnimalType } from '@animal/domain/animalType';
import { AnimalTypeRepository } from '@animal/repository/animalType.repository.impl';
import { AppError } from '@shared/core/AppError';
import { Either, left, Result, right } from '@shared/core/Result';
import { UseCase } from '@shared/core/UseCase';
import { Inject, Service } from 'typedi';
import { GetAllAnimalTypeErrors } from './getAllAnimalType.errors';
import LOG from '@shared/infra/logger/logger';

type Response = Either<AppError.UnexpectedError, Result<AnimalType[]>>;

@Service()
export class GetAllAnimalTypeUseCase implements UseCase<null, Promise<Response>> {
  @Inject()
  private animalTypeRepository: AnimalTypeRepository;

  async execute(): Promise<Response> {
    try {
      const animalType = await this.animalTypeRepository.findAll();
      if (!animalType) {
        return left(new GetAllAnimalTypeErrors.AnimalTypeNotFound());
      }
      return right(Result.ok<AnimalType[]>(animalType));
    } catch (error: any) {
      LOG.error('Error fetching list of animal type %s', error);
      return left(new AppError.UnexpectedError('Error fetching list of animal type'));
    }
  }
}
