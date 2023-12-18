import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindDetailDto {
  @ApiProperty()
  @IsString()
  readonly query: string;
}
