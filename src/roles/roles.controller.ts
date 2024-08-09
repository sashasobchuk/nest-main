import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './model';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  getAllRoles(): Promise<Role[]> {
    return this.rolesService.findAllRoles();
  }
  @Get('/:value')
  getByValue(@Param('value') value: string): Promise<Role> {
    return this.rolesService.findByValue(value);
  }
}
