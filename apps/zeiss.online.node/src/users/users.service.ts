import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {

  }
  create(input: User) : Promise<User> {
    return this.userRepository.save(input);
  }

  findAll() : Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.createQueryBuilder().where("id = :id", { id: id }).getOne();
  }

  findOneByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.userRepository.createQueryBuilder().where("phoneNumber = :phoneNumber", { phoneNumber: phoneNumber }).getOne();
  }

  update(id: number, input: User) {
    this.userRepository.update(id, input);
  }

  async remove(id: number) : Promise<void> {
    await this.userRepository.delete(id);
  }
}
