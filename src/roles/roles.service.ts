import { Injectable } from '@nestjs/common';
import { Role } from './model';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}
  async createRole(role: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create(role);
  }
  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async findByValue(value: string): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { value: value } });
  }
}
