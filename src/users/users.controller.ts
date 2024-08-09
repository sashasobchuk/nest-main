import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guards';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Roles('admin role')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: User })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Roles('admin role')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/role')
  async addRole(@Body() addRoleDto: AddRoleDto): Promise<User> {
    return this.usersService.addRole(addRoleDto);
  }

  @Roles('admin role')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/ban')
  async ban(@Body() banUserDto: BanUserDto): Promise<User> {
    return this.usersService.banUser(banUserDto);
  }
}
