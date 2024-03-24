import { ApiProperty } from "@nestjs/swagger";

export class MachineDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  partNumber: string | null;

  @ApiProperty({ nullable: true })
  price: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(model: Partial<MachineDto>) {
    this.id = model?.id;
    this.name = model?.name;
    this.partNumber = model?.partNumber;
    this.price = model?.price;
    this.createdAt = model?.createdAt;
    this.updatedAt = model?.updatedAt;
  }
}
