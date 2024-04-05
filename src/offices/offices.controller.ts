import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { OfficesService } from "./offices.service";
import {
  OfficeDto,
  CreateOfficeDto,
  UpdateOfficeDto,
  FindOfficeDto,
} from "./dto";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import {
  AppApiUnauthorizedResponse,
  AppApiNotFoundResponse,
  AppApiForbiddenResponse,
} from "src/common/swagger/decorators";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("offices")
@Controller("offices")
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Post()
  @ApiCreatedResponse({ type: OfficeDto })
  create(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.create(createOfficeDto);
  }

  @Get()
  @ApiOkResponse({ type: OfficeDto, isArray: true })
  findAll(@Query() findOfficeDto: FindOfficeDto) {
    return this.officesService.findAll(findOfficeDto);
  }

  @Get(":id")
  @ApiOkResponse({ type: OfficeDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.officesService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: OfficeDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateOfficeDto: UpdateOfficeDto
  ) {
    return this.officesService.update(id, updateOfficeDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: OfficeDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.officesService.remove(id);
  }
}
