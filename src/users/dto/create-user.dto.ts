import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'example@email.com', description: 'email' })
  readonly email: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty({ example: '111', description: 'password' })
  readonly password: string;
}
