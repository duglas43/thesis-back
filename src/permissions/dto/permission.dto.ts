import { ApiProperty } from "@nestjs/swagger";
import { PermissionFieldDto } from "src/permission-fields/dto";
import { ACTIONS } from "src/casl/enum";

export class PermissionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  subjectId: string;

  @ApiProperty()
  modality: boolean;

  @ApiProperty({ enum: ACTIONS, enumName: "ACTIONS" })
  action: ACTIONS;

  @ApiProperty({ type: [PermissionFieldDto] })
  fields: PermissionFieldDto[];

  @ApiProperty()
  condition: string;

  @ApiProperty({ nullable: true })
  reason: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ nullable: true })
  updatedAt: Date;

  constructor(model: Record<any, any>) {
    this.id = model.id;
    this.subjectId = model.subjectId;
    this.modality = model.modality;
    this.action = model.action;
    this.fields = model.fields;
    this.condition = model.condition;
    this.reason = model.reason;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
