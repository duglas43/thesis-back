import { ApiProperty } from '@nestjs/swagger';

export class PermissionFieldDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  permissionId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(model: Record<any, any>) {
    this.id = model.id;
    this.permissionId = model.permissionId;
    this.name = model.name;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
