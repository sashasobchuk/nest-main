import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty({ example: 'Admin' })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'roleDescription' })
  readonly description: string;
}
