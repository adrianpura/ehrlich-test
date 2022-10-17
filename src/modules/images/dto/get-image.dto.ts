import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class GetImagesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  page: number;
}
