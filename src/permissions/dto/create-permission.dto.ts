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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  condition?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ enum: ACTIONS, enumName: "ACTIONS" })
  @IsEnum(ACTIONS)
  action: ACTIONS;
}
