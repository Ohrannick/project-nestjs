import { log } from 'console';
import { UsersService } from './users.service';
import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Render, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersEntity } from './users.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditUserDto } from './dtos/edit-user-dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
    // private readonly authService: AuthService
    ) { }

  @Post('api')
  async create(@Body() user: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(user)
  }

  @Get('edit-profile/:id')
  @Render('user/edit-profile')
  async renderEditProfile(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const _user = await this.usersService.findById(id);
    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Неверный идентификатор пользователя',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return _user;
  }

  @Patch('api')
  @UseGuards(JwtAuthGuard)
  async edit(@Body() user: EditUserDto, @Req() req) {
    console.log(user)
    const jwtUserId = req.user.userId;
    return this.usersService.edit(jwtUserId, user);
  }
}
