import { Mapper } from '@shared/infra/http/mapper';
import { AnimalType } from '@animal/domain/animalType';
import { AnimalTypeEntity } from '@animal/repository/animalType.entity';
import { Name } from '@common/domain/Name';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AnimalTypeDTO } from '@animal/useCases/getAllAnimalType/getAllAnimalType.dto';
import LOG from '@shared/infra/logger/logger';

export class AnimalTypeMapper implements Mapper<AnimalType> {
  static toDTO(animalType: AnimalType): AnimalTypeDTO {
    return {
      id: animalType.animalTypeId.id.toString(),
      name: animalType.name.value
    };
  }
  public static toEntity(domain: AnimalType): AnimalTypeEntity {
    const entity = new AnimalTypeEntity();
    entity.id = domain.animalTypeId.id.toString();
    entity.name = domain.name.value;
    return entity;
  }

  public static toDomain(entity: AnimalTypeEntity): AnimalType | null {
    const animalTypeOrError = AnimalType.create(
      {
        name: Name.create({ value: entity.name }).getValue()
      },
      new UniqueEntityId(entity.id)
    );
    if (animalTypeOrError.isFailure) {
      LOG.error('error while converting AnimalTypeEntity to domain %s', animalTypeOrError.getErrorValue());
      return null;
    }
    return animalTypeOrError.getValue();
  }

  public static toDomainList(entities: AnimalTypeEntity[]): AnimalType[] {
    const result: AnimalType[] = [];
    for (const entity of entities) {
      const domain = this.toDomain(entity);
      if (domain) {
        result.push(domain);
      }
    }
    return result;
  }
}
