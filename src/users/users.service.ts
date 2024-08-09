import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.findByValue('admin role');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getUsersByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
  }

  async addRole(userDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(userDto.userId);
    const role = await this.roleService.findByValue(userDto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return user;
    }
    throw new HttpException('user role not recognized', HttpStatus.NOT_FOUND);
  }

  async banUser(banUserDto: BanUserDto) {
    const user = await this.userRepository.findByPk(banUserDto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = banUserDto.banReason;
    await user.save();
    return user;
  }
}
