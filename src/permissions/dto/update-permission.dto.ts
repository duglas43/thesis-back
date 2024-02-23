import { IsString, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto {
  @ApiProperty()
  @IsInt()
  subjectId: number;

  @ApiProperty()
  @IsBoolean()
  modality: boolean;

  // TODO: enum
  @ApiProperty()
  @IsString()
  action: string;
}
