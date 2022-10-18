import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { Users } from '../../entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService, // private configService: ConfigService,
  ) {}

  @ApiCreatedResponse({ type: Users, description: 'User Registration' })
  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }
}
