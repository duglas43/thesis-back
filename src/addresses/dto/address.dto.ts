import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  index: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  district: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(model: Partial<AddressDto>) {
    this.id = model?.id;
    this.clientId = model?.clientId;
    this.index = model?.index;
    this.city = model?.city;
    this.district = model?.district;
    this.street = model?.street;
    this.building = model?.building;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
  }
}
