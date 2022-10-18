import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SaveImagesDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  hits: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  uri: string;
}
