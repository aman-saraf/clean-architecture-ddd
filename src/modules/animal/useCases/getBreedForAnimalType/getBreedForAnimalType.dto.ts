import { IsNotEmpty, IsString } from 'class-validator';

export class GetBreedForAnimalTypeRequestDTO {
  @IsNotEmpty()
  @IsString()
  typeId: string;
}

export interface GetBreedForAnimalTypeResponseDTO {
  id: string;

  name: string;
}
