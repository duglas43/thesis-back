import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  addressId: number;

  @ApiProperty()
  responsibleId: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  comment: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(model: Partial<OrderDto>) {
    this.id = model?.id;
    this.clientId = model?.clientId;
    this.addressId = model?.addressId;
    this.responsibleId = model?.responsibleId;
    this.name = model?.name;
    this.comment = model?.comment;
    this.statusCode = model?.statusCode;
    this.totalPrice = model?.totalPrice;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
  }
}
