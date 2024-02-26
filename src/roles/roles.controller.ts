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
  ParseArrayPipe,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto, UpdateRoleDto, RoleDto, FindRoleDto } from "./dto";
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
import { CheckPolicies } from "src/casl/decorator";
import { RoleModel } from "./model/role.model";
import { AppApiArrayBodyParam } from "src/common/swagger/decorators";
import { PermissionDto } from "src/permissions/dto";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiCreatedResponse({ type: RoleDto })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({ type: RoleDto, isArray: true })
  findAll(@Query() findRoleDto: FindRoleDto) {
    return this.rolesService.findAll(findRoleDto);
  }

  @Get(":id")
  @ApiOkResponse({ type: RoleDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: RoleDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: RoleDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }

  @Get(":id/permissions")
  @ApiOkResponse({ type: [PermissionDto] })
  findPermissions(@Param("id", ParseIntPipe) id: number) {
    return this.rolesService.findPermissions(id);
  }

  @Post(":id/permissions")
  @AppApiArrayBodyParam("permissionsId", "number")
  @ApiOkResponse({ type: [PermissionDto] })
  addPermissions(
    @Param("id", ParseIntPipe) id: number,
    @Body("permissionsId", new ParseArrayPipe({ items: Number }))
    permissionsId: number[]
  ) {
    return this.rolesService.addPermissions(id, permissionsId);
  }

  @Delete(":id/permissions")
  @AppApiArrayBodyParam("permissionsId", "number")
  @ApiOkResponse({ type: [PermissionDto] })
  removePermissions(
    @Param("id", ParseIntPipe) id: number,
    @Body("permissionsId", new ParseArrayPipe({ items: Number }))
    permissionsId: number[]
  ) {
    return this.rolesService.removePermissions(id, permissionsId);
  }
}
