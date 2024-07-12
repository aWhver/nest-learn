import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.userName = createUserDto.userName;
    user.password = createUserDto.password;
    console.log('user', user);
    return await this.userRepository.save(user);
    // return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.userRepository.find();
    return {
      data: users,
      code: 200,
      message: '请求成功',
    };
    // return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
    // return `This action returns a #${id} user`;
  }

  async findOneBy(username: string) {
    return await this.userRepository.findOne({
      where: {
        userName: username,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return await this.userRepository.update(id, updateUserDto);
    // return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
    // return `This action removes a #${id} user`;
  }
}
