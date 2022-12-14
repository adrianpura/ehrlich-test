export class CreateImageDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UploadImageDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  uri: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  hits: number;

  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  owner: string;
}
