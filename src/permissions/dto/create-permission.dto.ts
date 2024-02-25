import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsArray,
  IsEnum,
  IsOptional,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ACTIONS } from "src/casl/enum";

class PermissionField {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
class PermissionCondition {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;
}
export class CreatePermissionDto {
  @ApiProperty()
  @IsInt()
  subjectId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  modality?: boolean;

  @ApiPropertyOptional({ type: [PermissionField] })
  @IsOptional()
  @IsArray()
  fields?: PermissionField[];

  @ApiPropertyOptional({ type: [PermissionCondition] })
  @IsOptional()
  @IsArray()
  conditions?: PermissionCondition[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  reason?: string;

  @ApiProperty({ enum: ACTIONS, enumName: "ACTIONS" })
  @IsEnum(ACTIONS)
  action: ACTIONS;
}
