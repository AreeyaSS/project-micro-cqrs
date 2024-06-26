import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetUserByIdQuery, GetUserByEmailQuery, GetUsersQuery } from './queries/impl';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { QueryBus } from '@nestjs/cqrs/dist/query-bus';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserCommand } from './commands/impl/update-user.command';

@Controller('users')
export class UsersController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(dto.name, dto.email));
  }

  @Put(':id')
  async update(@Body() dtoUpdate: UpdateUserDto, @Param('id') id: string) {
    return this.commandBus.execute(new UpdateUserCommand(id, dtoUpdate.name, dtoUpdate.email));
  }

  @Get()
  async getAll(): Promise<User> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Get('/email/:email')
  async getByEmail(@Param('email') email: string): Promise<User> {
    return this.queryBus.execute(new GetUserByEmailQuery(email));
  }
}
