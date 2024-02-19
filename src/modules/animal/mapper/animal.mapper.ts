import { Mapper } from '@shared/infra/http/mapper';
import { Name } from '@common/domain/Name';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Animal } from '@animal/domain/animal';
import { AnimalEntity } from '@animal/repository/animal.entity';
import { Breed } from '@animal/domain/breed';
import { AnimalType } from '@animal/domain/animalType';
import { UserMapper } from '@user/mapper/user.mapper';
import { BreedMapper } from './breed.mapper';
import { AnimalTypeMapper } from './animalType.mapper';
import { Gender } from '@animal/domain/gender';
import LOG from '@shared/infra/logger/logger';
import { Animals } from '@animal/domain/animals';
import { AnimalDTO } from '@user/dto/animal.dto';
import { DateUtils } from '@shared/utils/DateUtils';

export class AnimalMapper implements Mapper<Animal> {
  public static async toDomain(entity: AnimalEntity): Promise<Animal | null> {
    const userDomain = UserMapper.toDomain(await entity.user);
    if (userDomain) {
      const animalType = AnimalType.create({
        name: Name.create({ value: (await entity.animalType).name }).getValue()
      }).getValue();

      const breedEntity = await entity.breed;

      const animalOrError = Animal.create(
        {
          isPet: entity.isPet,
          dateOfBirth: entity.dateOfBirth,
          breed: breedEntity
            ? Breed.create({
                name: Name.create({ value: breedEntity.name }).getValue(),
                animalType: animalType
              }).getValue()
            : undefined,
          animalType: animalType,
          user: userDomain,
          name: entity.name ? Name.create({ value: entity.name }).getValue() : undefined,
          gender: entity.gender ? Gender[entity.gender as keyof typeof Gender] : undefined
        },
        new UniqueEntityId(entity.id)
      );
      if (animalOrError.isFailure) {
        LOG.error('error while converting user entity to domain %s', animalOrError.getErrorValue());
        return null;
      }
      return animalOrError.getValue();
    }
    return null;
  }

  public static toEntity(domain: Animal): AnimalEntity {
    const entity = new AnimalEntity();
    entity.id = domain.animalId.id.toString();
    entity.dateOfBirth = domain.dateOfBirth;
    entity.animalType = Promise.resolve(AnimalTypeMapper.toEntity(domain.animalType));
    entity.breed = domain.breed ? Promise.resolve(BreedMapper.toEntity(domain.breed)) : undefined;
    entity.isPet = domain.isPet;
    entity.user = Promise.resolve(UserMapper.toEntity(domain.user));
    entity.name = domain.name?.value;
    entity.gender = domain.gender?.valueOf();
    return entity;
  }

  public static async toDomainBulk(entities: AnimalEntity[]): Promise<Animals> {
    const result = Animals.create();
    for (const entity of entities) {
      const domain = await this.toDomain(entity);
      if (domain) {
        result.add(domain);
      }
    }
    return result;
  }

  public static toAnimalsDTO(animals: Animals): AnimalDTO[] {
    const result: AnimalDTO[] = [];
    if (animals) {
      for (const animal of animals.getItems()) {
        result.push(this.toAnimalDTO(animal));
      }
    }
    return result;
  }

  public static toAnimalDTO(animal: Animal): AnimalDTO {
    return {
      id: animal.animalId.id.toString(),
      animalTypeId: {
        id: animal.animalType.animalTypeId.id.toString(),
        name: animal.animalType.name.value
      },
      isPet: animal.isPet,
      dateOfBirth: DateUtils.getIndianDayAsString(animal.dateOfBirth),
      breed: {
        id: animal.breed?.breedId.id.toString(),
        name: animal.breed?.name.value
      },
      name: animal.name?.value,
      gender: animal.gender
    };
  }
}
