import {
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  IsOptional,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { ACTIONS } from "src/casl/enum";

export class UpdatePermissionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  subjectId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  modality: boolean;

  @ApiPropertyOptional({ enum: ACTIONS, enumName: "ACTIONS" })
  @IsOptional()
  @IsEnum(ACTIONS)
  @IsString()
  action: ACTIONS;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  condition: string;
}
