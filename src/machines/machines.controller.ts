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
} from "src/common/swagger/decorators";
import { CheckPolicies } from "src/casl/decorator";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { GetAbility } from "src/casl/decorator";
import { ACTIONS } from "src/casl/enum";
import { MachineModel } from "./model/machine.model";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("machines")
@Controller("machines")
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  @CheckPolicies((ability) => ability.can(ACTIONS.CREATE, MachineModel))
  @ApiCreatedResponse({ type: MachineDto })
  create(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(createMachineDto);
  }

  @Get()
  @ApiOkResponse({ type: MachineDto, isArray: true })
  findAll(
    @Query() findMachineDto: FindMachineDto,
    @GetAbility() ability: AppAbility
  ) {
    return this.machinesService.findAll(findMachineDto, ability);
  }

  @Get(":id")
  @ApiOkResponse({ type: MachineDto })
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility
  ) {
    return this.machinesService.findOne(id, ability);
  }

  @Patch(":id")
  @ApiOkResponse({ type: MachineDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMachineDto: UpdateMachineDto,
    @GetAbility() ability: AppAbility
  ) {
    return this.machinesService.update(id, updateMachineDto, ability);
  }

  @Delete(":id")
  @ApiOkResponse({ type: MachineDto })
  remove(
    @Param("id", ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility
  ) {
    return this.machinesService.remove(id, ability);
  }
}
