import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'src/utils/crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) { }

  async create(user: CreateUserDto) {
    const userEntity = new UsersEntity();
    userEntity.firstName = user.firstName;
    userEntity.email = user.email;
    userEntity.roles = user.roles;
    userEntity.password = await hash(user.password);

    return this.usersRepository.save(userEntity)
  }

  async findById(id: number) {
    return this.usersRepository.findOne(id)
  }

  async findByEmail(email): Promise<UsersEntity> {
    return await this.usersRepository.findOne({ email })
  }
}
