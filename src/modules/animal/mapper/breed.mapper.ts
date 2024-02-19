import { Mapper } from '@shared/infra/http/mapper';
import { Name } from '@common/domain/Name';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Breed } from '@animal/domain/breed';
import { BreedEntity } from '@animal/repository/breed.entity';
import { Breeds } from '@animal/domain/breeds';
import { AnimalTypeMapper } from './animalType.mapper';
import { GetBreedForAnimalTypeResponseDTO } from '@animal/useCases/getBreedForAnimalType/getBreedForAnimalType.dto';
import LOG from '@shared/infra/logger/logger';

export class BreedMapper implements Mapper<Breed> {
  static toDTO(breed: Breed): GetBreedForAnimalTypeResponseDTO {
    return { id: breed.breedId.id.toString(), name: breed.name.value };
  }
  public static async toDomain(entity: BreedEntity): Promise<Breed | null> {
    const animalType = AnimalTypeMapper.toDomain(await entity.animalType);
    if (!animalType) {
      LOG.error('Error while creating Animal Type');
      return null;
    }
    const breedOrError = Breed.create(
      {
        name: Name.create({ value: entity.name }).getValue(),
        animalType: animalType
      },
      new UniqueEntityId(entity.id)
    );
    if (breedOrError.isFailure) {
      LOG.error('error while converting user entity to domain %s', breedOrError.getErrorValue());
      return null;
    }
    return breedOrError.getValue();
  }

  public static async toDomainWatchedList(entities: BreedEntity[]): Promise<Breeds> {
    const breeds: Breed[] = [];

    for (const entity of entities) {
      const domain = await BreedMapper.toDomain(entity);
      if (domain) {
        breeds.push(domain);
      }
    }

    return Breeds.create(breeds);
  }

  public static toEntity(domain: Breed): BreedEntity {
    const entity = new BreedEntity();
    entity.id = domain.breedId.id.toString();
    entity.name = domain.name.value;
    entity.animalType = Promise.resolve(AnimalTypeMapper.toEntity(domain.animalType));
    return entity;
  }

  public static toEntityList(domainList: Breed[]): BreedEntity[] {
    const breeds: BreedEntity[] = [];
    for (const domain of domainList) {
      breeds.push(this.toEntity(domain));
    }
    return breeds;
  }
}
