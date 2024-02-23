import { ApiProperty } from '@nestjs/swagger';

export class PermissionConditionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  permissionId: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(model: Record<any, any>) {
    this.id = model.id;
    this.permissionId = model.permissionId;
    this.key = model.key;
    this.value = model.value;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
