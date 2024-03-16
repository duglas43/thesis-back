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
import { MachinesService } from "./machines.service";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import {
  CreateMachineDto,
  UpdateMachineDto,
  MachineDto,
  FindMachineDto,
} from "./dto";
import {
  AppApiUnauthorizedResponse,
  AppApiNotFoundResponse,
  AppApiForbiddenResponse,
  ApiListResponse,
} from "src/common/swagger/decorators";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("machines")
@Controller("machines")
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  @ApiCreatedResponse({ type: MachineDto })
  create(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(createMachineDto);
  }

  @Get()
  @ApiListResponse(MachineDto)
  findAll(@Query() findMachineDto: FindMachineDto) {
    return this.machinesService.findAll(findMachineDto);
  }

  @Get(":id")
  @ApiOkResponse({ type: MachineDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.machinesService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: MachineDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMachineDto: UpdateMachineDto
  ) {
    return this.machinesService.update(id, updateMachineDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: MachineDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.machinesService.remove(id);
  }
}
