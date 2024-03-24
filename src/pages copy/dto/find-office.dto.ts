import { IsString, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindOfficeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly query: string;
}
