import { Breeds } from '@animal/domain/breeds';
import { AnimalTypeRepository } from '@animal/repository/animalType.repository.impl';
import { BreedRepository } from '@animal/repository/breed.repository.impl';
import { AppError } from '@shared/core/AppError';
import { Either, left, Result, right } from '@shared/core/Result';
import { UseCase } from '@shared/core/UseCase';
import { Inject, Service } from 'typedi';
import { GetBreedForAnimalTypeRequestDTO } from './getBreedForAnimalType.dto';
import { GetBreedForAnimalTypeErrors } from './getBreedForAnimalType.errors';
import LOG from '@shared/infra/logger/logger';

type Response = Either<GetBreedForAnimalTypeErrors.CorruptAnimalTypeError | AppError.UnexpectedError, Result<Breeds>>;

@Service()
export class GetBreedForAnimalTypeUseCase implements UseCase<GetBreedForAnimalTypeRequestDTO, Promise<Response>> {
  @Inject()
  private breedRepository: BreedRepository;

  @Inject()
  private animalTypeRepository: AnimalTypeRepository;

  async execute(request: GetBreedForAnimalTypeRequestDTO): Promise<Response> {
    try {
      const animalType = await this.animalTypeRepository.findAnimalTypeById(request.typeId);
      if (!animalType) {
        return left(new GetBreedForAnimalTypeErrors.CorruptAnimalTypeError(request.typeId));
      }
      const breeds = await this.breedRepository.findBreedByAnimalType(animalType);
      if (!breeds) {
        return right(Result.ok<Breeds>());
      }
      return right(Result.ok<Breeds>(breeds));
    } catch (error: any) {
      LOG.error('Error fetching list of booking purpose %s', error);
      return left(new AppError.UnexpectedError('Error fetching list of booking purpose'));
    }
  }
}
