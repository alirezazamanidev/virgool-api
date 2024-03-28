import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { AuthMethod, AuthType } from '../enums';

export class AuthDTo {
  @ApiProperty()
  @IsString()
  @Length(3, 100)
  username: string;
  @ApiProperty({ enum: AuthType })
  @IsEnum(AuthType)
  type: AuthType;
  @ApiProperty({ enum: AuthMethod })
  @IsEnum(AuthMethod)
  method: AuthMethod;
}
