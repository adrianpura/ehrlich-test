import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Users } from '../../entities/users.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const aes256 = require('aes256');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const data = await this.usersRepository.createUser(createUserDto);

    return {
      statusCode: 201,
      message: 'user created',
      data: data,
    };
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<any> {
    const { id } = updateUserDto;
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const data = await this.usersRepository.updateUser(user, updateUserDto);

    return {
      statusCode: 200,
      message: 'user updated',
      data: data,
    };
  }

  async deleteUser(id: number): Promise<any> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'user deleted',
      data: [],
    };
  }

  async getAllUsers(filterDto: GetUsersFilterDto, options: IPaginationOptions): Promise<Pagination<Users>> {
    return await this.usersRepository.getAllUsers(filterDto, options);
  }

  async deleteMultipleUser(req): Promise<any> {
    const result = await this.usersRepository.deleteMultiple(req.body['ids']);

    if (result.affected === 0) {
      throw new NotFoundException(`Unable to delete`);
    }

    return {
      statusCode: 200,
      message: 'users deleted',
      data: [],
    };
  }

  async findOne(username: string): Promise<Users | undefined> {
    return this.usersRepository.findOne(username);
  }
}
