import { UserEntity } from '@user/repository/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { AnimalTypeEntity } from './animalType.entity';
import { BreedEntity } from './breed.entity';

@Entity({ name: 'animal' })
export class AnimalEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'is_pet' })
  isPet: boolean;

  @Column({ name: 'date_of_birth', nullable: true })
  dateOfBirth?: Date;

  @ManyToOne(() => BreedEntity, { nullable: true })
  @JoinColumn({ name: 'breed_id' })
  breed?: Promise<BreedEntity>;

  @OneToOne(() => AnimalTypeEntity)
  @JoinColumn({ name: 'animal_type_id' })
  animalType: Promise<AnimalTypeEntity>;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: Promise<UserEntity>;

  @Column({ name: 'name', nullable: true })
  name?: string;

  @Column({ name: 'gender', nullable: true })
  gender?: string;
}
