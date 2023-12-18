import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOrderDto {
  @ApiProperty()
  @IsString()
  readonly query: string;
}
