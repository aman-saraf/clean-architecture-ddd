import { AnimalType } from '@animal/domain/animalType';

export interface IAnimalTypeRepository {
  findAnimalTypeById(animalTypeId: string): Promise<AnimalType | null>;
  findAnimalTypeByName(name: string): Promise<AnimalType | null>;
}
