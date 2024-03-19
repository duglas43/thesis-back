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
import { CheckPolicies } from "src/casl/decorator";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS } from "src/casl/enum";
import { MachineModel } from "./model";
import { GetUser } from "src/auth/decorator";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("machines")
@Controller("machines")
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.CREATE, MachineModel)
  )
  @ApiCreatedResponse({ type: MachineDto })
  create(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(createMachineDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.READ, MachineModel)
  )
  @ApiListResponse(MachineDto)
  findAll(@Query() findMachineDto: FindMachineDto) {
    return this.machinesService.findAll(findMachineDto);
  }

  @Get(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.READ, MachineModel)
  )
  @ApiOkResponse({ type: MachineDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.machinesService.findOne(id);
  }

  @Patch(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.UPDATE, MachineModel)
  )
  @ApiOkResponse({ type: MachineDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMachineDto: UpdateMachineDto
  ) {
    return this.machinesService.update(id, updateMachineDto);
  }

  @Delete(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.DELETE, MachineModel)
  )
  @ApiOkResponse({ type: MachineDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.machinesService.remove(id);
  }
}
