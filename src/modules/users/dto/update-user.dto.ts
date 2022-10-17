import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  post_code: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  contact_number: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
    { message: 'email format is invalid ' },
  )
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  username: string;
}
