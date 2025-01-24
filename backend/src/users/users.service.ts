import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User as STUser } from 'supertokens-node';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(stUser: STUser) {
    return this.userRepository.create({
      id: stUser.id,
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUser: Partial<STUser>) {
    return await this.userRepository.update({ id }, updateUser);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
