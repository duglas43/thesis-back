import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindParamDto {
  @ApiProperty()
  @IsString()
  readonly query: string;
}
