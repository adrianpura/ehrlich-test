import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Matches, Validate, IsEmail } from 'class-validator';
import { IsEmailNotEmailCom } from '../validator/isEmailNotEmailCom';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ required: true })
  @Validate(IsEmailNotEmailCom)
  @IsString()
  @IsEmail()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
    { message: 'email format is invalid ' },
  )
  @IsNotEmpty()
  email: string;
}
