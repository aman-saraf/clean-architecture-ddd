import { Inject, Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';
import { AnimalTypeEntity } from './animalType.entity';
import { IAnimalTypeRepository } from './animalType.repository';
import { AnimalType } from '@animal/domain/animalType';
import { AnimalTypeMapper } from '@animal/mapper/animalType.mapper';
import LOG from '@shared/infra/logger/logger';

@Service()
export class AnimalTypeRepository implements IAnimalTypeRepository {
  private animalTypeRepository: Repository<AnimalTypeEntity>;

  constructor(@Inject('datasource') private datasource: DataSource) {
    this.animalTypeRepository = datasource.getRepository(AnimalTypeEntity);
  }

  async findAnimalTypeById(animalTypeId: string): Promise<AnimalType | null> {
    const animalTypeEntity = await this.animalTypeRepository.findOneBy({ id: animalTypeId });
    if (!animalTypeEntity) {
      LOG.error('animal type entity not found %s', animalTypeId);
      return null;
    }
    return AnimalTypeMapper.toDomain(animalTypeEntity);
  }

  async findAnimalTypeByName(name: string): Promise<AnimalType | null> {
    const animalTypeQuery = this.animalTypeRepository.createQueryBuilder('animal_type');
    animalTypeQuery.andWhere('name ILIKE(:name)').setParameter('name', `${name}`);
    const animalTypeEntity = await animalTypeQuery.getOne();
    if (!animalTypeEntity) {
      LOG.error('animal type entity not found %s', name);
      return null;
    }
    return AnimalTypeMapper.toDomain(animalTypeEntity);
  }

  async findAll(): Promise<AnimalType[] | null> {
    const animalTypeEntities: AnimalTypeEntity[] = await this.animalTypeRepository.find({ order: { name: 'ASC' } });
    if (!animalTypeEntities) {
      LOG.error('animal types entities not found');
      return null;
    }
    return AnimalTypeMapper.toDomainList(animalTypeEntities);
  }
}
