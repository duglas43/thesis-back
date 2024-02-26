import { IsString, IsInt, IsBoolean, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ACTIONS } from "src/casl/enum";

export class UpdatePermissionDto {
  @ApiProperty()
  @IsInt()
  subjectId: number;

  @ApiProperty()
  @IsBoolean()
  modality: boolean;

  @ApiProperty({ enum: ACTIONS, enumName: "ACTIONS" })
  @IsEnum(ACTIONS)
  @IsString()
  action: ACTIONS;
}
