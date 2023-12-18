import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsInt()
  statusCode: number;

  @ApiProperty()
  @IsInt()
  totalPrice: number;

  @ApiProperty()
  @IsInt()
  clientId: number;

  @ApiProperty()
  @IsInt()
  addressId: number;

  @ApiProperty()
  @IsInt()
  responsibleId: number;
}
