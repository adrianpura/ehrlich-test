import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class UpdateImageDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  hits: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  uri: string;
}
