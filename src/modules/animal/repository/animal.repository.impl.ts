import { Inject, Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { IAnimalRepository } from './animal.repository';
import { Animal } from '@animal/domain/animal';
import { AnimalMapper } from '@animal/mapper/animal.mapper';
import LOG from '@shared/infra/logger/logger';
import { User } from '@user/domain/user';
import { UserMapper } from '@user/mapper/user.mapper';
import { Animals } from '@animal/domain/animals';

@Service()
export class AnimalRepository implements IAnimalRepository {
  private animalRepository: Repository<AnimalEntity>;

  constructor(@Inject('datasource') private datasource: DataSource) {
    this.animalRepository = datasource.getRepository(AnimalEntity);
  }

  async save(animal: Animal): Promise<void> {
    const animale = await this.animalRepository.save(AnimalMapper.toEntity(animal));
  }

  async findAnimalById(animalId: string): Promise<Animal | null> {
    const animalEntity = await this.animalRepository.findOneBy({ id: animalId });
    if (!animalEntity) {
      LOG.error('animal entity not found %s', animalId);
      return null;
    }
    return AnimalMapper.toDomain(animalEntity);
  }

  async findAnimalByUser(user: User): Promise<Animals | null> {
    const userEntity = UserMapper.toEntity(user);
    const animalEntities = await this.animalRepository.findBy({ user: userEntity });
    if (!animalEntities) {
      LOG.error('animal entity not found for user %s', user.id.toValue());
      return null;
    }
    return AnimalMapper.toDomainBulk(animalEntities);
  }
}
