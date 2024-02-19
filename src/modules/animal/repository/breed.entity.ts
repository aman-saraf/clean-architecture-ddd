import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { AnimalTypeEntity } from './animalType.entity';

@Entity({ name: 'breed' })
export class BreedEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToOne(() => AnimalTypeEntity)
  @JoinColumn({ name: 'animal_type_id' })
  animalType: Promise<AnimalTypeEntity>;
}
