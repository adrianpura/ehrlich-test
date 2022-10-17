import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  limit: number;

  @IsOptional()
  @IsNotEmpty()
  page: number;
}
