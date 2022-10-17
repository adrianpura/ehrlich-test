import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class SaveImagesDto {
  @IsOptional()
  @IsNotEmpty()
  hits: number;

  @IsOptional()
  @IsNotEmpty()
  uri: string;
}
