import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectMapper, MapInterceptor, MapPipe } from '@automapper/nestjs';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../validation/validation.pipe';
import { Mapper } from '@automapper/core';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    @InjectMapper() 
    private readonly mapper: Mapper,
    private readonly usersService: UsersService
  ) {}

  @Post()
  @UseInterceptors(MapInterceptor(User, UserDto))
  create(@Body(new ValidationPipe()) createUser: CreateUserDto) : Promise<UserDto> {
    const user = this.mapper.map(createUser, CreateUserDto, User);
    return this.usersService.create(user);
  }

  @Get()
  @UseInterceptors(MapInterceptor(User, UserDto))
  findAll() : Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(User, UserDto))
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(MapPipe(UpdateUserDto, User)) updateUser: User) {
    return this.usersService.update(+id, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
