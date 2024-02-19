import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'animal_type' })
export class AnimalTypeEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
