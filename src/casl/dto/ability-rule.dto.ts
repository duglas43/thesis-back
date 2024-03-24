import { ApiProperty } from "@nestjs/swagger";
import { ACTIONS } from "../enum";

export class AbilityRuleDto {
  @ApiProperty({ enum: ACTIONS, enumName: "ACTIONS" })
  action: ACTIONS;
  @ApiProperty()
  inverted: boolean;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  fields: string[];
  @ApiProperty()
  conditions: Object;
  @ApiProperty()
  reason: string;

  constructor(model: any) {
    this.action = model?.action;
    this.inverted = model?.inverted;
    this.subject = model?.subject;
    this.fields = model?.fields;
    this.conditions = model?.conditions;
    this.reason = model?.reason;
  }
}
