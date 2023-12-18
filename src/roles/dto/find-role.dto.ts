import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindRoleDto {
  @ApiProperty()
  @IsString()
  readonly query: string;
}
