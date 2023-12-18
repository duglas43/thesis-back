import { ApiProperty } from '@nestjs/swagger';

export class DetailDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  partNumber: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(model: Partial<DetailDto>) {
    this.id = model?.id;
    this.name = model?.name;
    this.partNumber = model?.partNumber;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
  }
}
