import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class UpdateImageDto {
  @IsOptional()
  @IsNotEmpty()
  hits: number;

  @IsOptional()
  @IsNotEmpty()
  uri: string;
}
