import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetImagesFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  page: number;
}
