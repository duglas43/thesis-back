import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAddressDto {
  @ApiProperty()
  @IsString()
  readonly query: string;
}
