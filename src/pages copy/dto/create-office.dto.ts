import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOfficeDto {
  @ApiProperty()
  @IsString()
  name: string;
}
