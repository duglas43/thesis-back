import {
  IsEmail,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsInt,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { LANGUAGES } from '../enums';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  login: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patronymic: string;

  @ApiPropertyOptional({ enum: LANGUAGES })
  @IsOptional()
  @IsEnum(LANGUAGES)
  language: LANGUAGES;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiPropertyOptional({})
  @IsOptional()
  @Transform(({ value }) => value?.map((id) => parseInt(id)) || null)
  @IsInt({ each: true })
  roleIds: number[] | null;
}
