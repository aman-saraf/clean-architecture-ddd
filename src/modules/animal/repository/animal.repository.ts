import { Animal } from '@animal/domain/animal';
import { Animals } from '@animal/domain/animals';
import { User } from '@user/domain/user';

export interface IAnimalRepository {
  findAnimalById(animalId: string): Promise<Animal | null>;
  save(animal: Animal): Promise<void>;
  findAnimalByUser(ser: User): Promise<Animals | null>;
}
