import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreatePermissionDto, UpdatePermissionDto, PermissionDto } from "./dto";
import { CheckPolicies } from "src/casl/decorator";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS } from "src/casl/enum";
import { PermissionModel } from "./model";

@ApiBearerAuth()
@ApiTags("permission")
@Controller("permission")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiCreatedResponse({ type: PermissionDto })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.READ, PermissionModel)
  )
  @ApiOkResponse({ type: [PermissionDto] })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ type: PermissionDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.permissionsService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: PermissionDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: PermissionDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.permissionsService.remove(id);
  }
}
