import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteMultipleUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  ids: [number];
}
