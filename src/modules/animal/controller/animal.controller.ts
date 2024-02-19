import { BaseController } from '@shared/infra/http/models/base.controller';
import { Controller, Get, Param, Res } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Response } from 'express';
import { GetBreedForAnimalTypeUseCase } from '@animal/useCases/getBreedForAnimalType/getBreedForAnimalType.usecase';
import { AnimalTypeMapper } from '@animal/mapper/animalType.mapper';
import { GetAllAnimalTypeUseCase } from '@animal/useCases/getAllAnimalType/getAllAnimalType.usecase';
import { AnimalTypeDTO } from '@animal/useCases/getAllAnimalType/getAllAnimalType.dto';
import { Guard } from '@shared/core/Guard';
import { BreedMapper } from '@animal/mapper/breed.mapper';
import { GetBreedForAnimalTypeResponseDTO } from '@animal/useCases/getBreedForAnimalType/getBreedForAnimalType.dto';
import LOG from '@shared/infra/logger/logger';

@Controller('/animal')
@Service()
export class AnimalController extends BaseController {
  @Inject()
  private getBreedForAnimalTypeUseCase: GetBreedForAnimalTypeUseCase;

  @Inject()
  private getAllAnimalTypeUseCase: GetAllAnimalTypeUseCase;

  @Get('/breeds/:animalTypeId')
  async getBreedsByAnimalType(@Param('animalTypeId') animalTypeId: string, @Res() response: Response) {
    try {
      const animalTypeIdOrError = Guard.againstNullOrUndefined(animalTypeId, 'animalTypeId');
      if (animalTypeIdOrError.isFailure) {
        return this.fail(response, animalTypeIdOrError.getErrorValue());
      }
      const result = await this.getBreedForAnimalTypeUseCase.execute({ typeId: animalTypeId });
      if (result.isLeft()) {
        return this.fail(response, result.value.getErrorValue().message);
      }
      return this.ok<GetBreedForAnimalTypeResponseDTO[]>(
        response,
        result.value.getValue().currentItems.map((breed) => BreedMapper.toDTO(breed))
      );
    } catch (error: any) {
      LOG.error('Error fetching list of breeds by animal type %s', error);
      return this.fail(response, error);
    }
  }

  @Get('/animalType')
  async getAllAnimalType(@Res() response: Response) {
    try {
      const animalTypes = await this.getAllAnimalTypeUseCase.execute();
      if (animalTypes.isLeft()) {
        return this.fail(response, animalTypes.value.getErrorValue().message);
      }
      const result = animalTypes.value.getValue().map((animalType) => AnimalTypeMapper.toDTO(animalType));
      return this.ok<AnimalTypeDTO[]>(response, result);
    } catch (error: any) {
      LOG.error('error while getting animal types with breeds %s', error);
      return this.fail(response, error);
    }
  }
}
