import { Inject, Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';
import { BreedEntity } from './breed.entity';
import { Breed } from '@animal/domain/breed';
import { BreedMapper } from '@animal/mapper/breed.mapper';
import { IBreedRepository } from './breed.repository';
import { AnimalType } from '@animal/domain/animalType';
import { AnimalTypeEntity } from './animalType.entity';
import { AnimalTypeMapper } from '@animal/mapper/animalType.mapper';
import { Breeds } from '@animal/domain/breeds';
import LOG from '@shared/infra/logger/logger';

@Service()
export class BreedRepository implements IBreedRepository {
  private breedRepository: Repository<BreedEntity>;

  constructor(@Inject('datasource') private datasource: DataSource) {
    this.breedRepository = datasource.getRepository(BreedEntity);
  }

  async findBreedById(breedId: string): Promise<Breed | null> {
    const breedEntity = await this.breedRepository.findOneBy({ id: breedId });
    if (!breedEntity) {
      LOG.error('breed entity not found %s', breedId);
      return null;
    }
    return BreedMapper.toDomain(breedEntity);
  }

  async findBreedByAnimalType(animalType: AnimalType): Promise<Breeds | null> {
    const animalTypeEntity = AnimalTypeMapper.toEntity(animalType);
    const breedEntities: BreedEntity[] = await this.breedRepository.find({
      where: { animalType: animalTypeEntity },
      order: { name: 'ASC' }
    });
    if (!breedEntities) {
      LOG.error('breed entities not found');
      return null;
    }
    return BreedMapper.toDomainWatchedList(breedEntities);
  }
}
