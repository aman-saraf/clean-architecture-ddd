import { AnimalType } from '@animal/domain/animalType';
import { Breed } from '@animal/domain/breed';
import { Breeds } from '@animal/domain/breeds';

export interface IBreedRepository {
  findBreedById(breedId: string): Promise<Breed | null>;
  findBreedByAnimalType(animalType: AnimalType): Promise<Breeds | null>;
}
