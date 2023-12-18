import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsInt,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LANGUAGES } from '../enums';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patronymic: string | null;

  @ApiPropertyOptional({ enum: LANGUAGES })
  @IsOptional()
  @IsEnum(LANGUAGES)
  language: LANGUAGES;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone: string | null;

  @ApiPropertyOptional({})
  @IsOptional()
  @Transform(({ value }) => value?.map((id) => parseInt(id)) || null)
  @IsInt({ each: true })
  roleIds: number[] | null;
}
