import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Users } from '../../entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { DeleteMultipleUserDto } from './dto/delete-multiple.dto';

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

  // @Patch()
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  // updateUser(@Body() updateUserDto: UpdateUserDto): Promise<any> {
  //   return this.usersService.updateUser(updateUserDto);
  // }

  // @Delete('/:id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
  //   return this.usersService.deleteUser(id);
  // }

  // @Get()
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // getUsers(
  //   @Query(ValidationPipe) filterDto: GetUsersFilterDto,
  //   @Query('page') page = 1,
  //   @Query('limit') limit = 10,
  // ): Promise<Pagination<Users>> {
  //   // const baseUrl = this.configService.get('BASE_URL');
  //   limit = limit > 100 ? 100 : limit;

  //   const params = filterDto;
  //   delete params['page'];
  //   delete params['limit'];

  //   const queryString = Object.keys(params)
  //     .map((key) => key + '=' + filterDto[key])
  //     .join('&');

  //   return this.usersService.getAllUsers(filterDto, {
  //     page,
  //     limit,
  //     route: '/users?' + queryString,
  //   });
  // }

  // @Post('deleteMultiple')
  // @ApiBody({
  //   type: DeleteMultipleUserDto,
  //   description: 'Delete Multiple Users',
  // })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  // deleteMultipleUser(@Req() req: Request): Promise<any> {
  //   return this.usersService.deleteMultipleUser(req);
  // }
}
