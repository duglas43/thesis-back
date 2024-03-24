import { IsString, IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMachineDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  partNumber: string;

  @ApiPropertyOptional()
  @IsNumber()
  price: number;
}
