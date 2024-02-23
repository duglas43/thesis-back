import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionFieldDto {
  @ApiProperty()
  @IsInt()
  permissionId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
