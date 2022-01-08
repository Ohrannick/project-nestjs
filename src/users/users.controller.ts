import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('api')
  async create(@Body() user: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(user)
  }
}
