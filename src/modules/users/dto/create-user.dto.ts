import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, Validate } from 'class-validator';
import { Role } from '../role.enum';
import { IsEmailNotEmailCom } from '../validator/isEmailNotEmailCom';

export class CreateUserDto {
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

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contains : at least one uppercase character, at least one lowercase character, atleast one digit, at least one special character',
  })
  password: string;

  @ApiProperty({ required: true, type: [String], enum: ['User', 'Admin'] })
  @IsNotEmpty()
  role: Role[];
}
