import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ParamsService } from "./params.service";
import { CreateParamDto, UpdateParamDto, ParamDto, FindParamDto } from "./dto";
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
@ApiTags("params")
@Controller("params")
export class ParamsController {
  constructor(private readonly paramsService: ParamsService) {}

  @Post()
  @ApiCreatedResponse({ type: ParamDto })
  create(@Body() createParamDto: CreateParamDto) {
    return this.paramsService.create(createParamDto);
  }

  @Get()
  @ApiOkResponse({ type: ParamDto, isArray: true })
  findAll(@Query() findParamDto: FindParamDto) {
    return this.paramsService.findAll(findParamDto);
  }

  @Get(":id")
  @ApiOkResponse({ type: ParamDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.paramsService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: ParamDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateParamDto: UpdateParamDto
  ) {
    return this.paramsService.update(id, updateParamDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: ParamDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.paramsService.remove(id);
  }
}
