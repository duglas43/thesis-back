import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty()
  @IsString()
  readonly query: string;
}
