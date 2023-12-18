import { ApiProperty } from '@nestjs/swagger';

export class ParamDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  unit: string | null;

  @ApiProperty()
  type: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(model: Partial<ParamDto>) {
    this.id = model?.id;
    this.name = model?.name;
    this.unit = model?.unit;
    this.type = model?.type;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
  }
}
