import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto, FindUserDto } from "./dto/";
import { UserDto } from "./dto";
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { GetUser } from "src/auth/decorator";
import { CheckPolicies } from "src/casl/decorator";
import { ACTIONS } from "src/casl/enum";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { GetAbility } from "src/casl/decorator";
import { UserModel } from "./model/user.model";
import {
  AppApiUnauthorizedResponse,
  AppApiNotFoundResponse,
  AppApiForbiddenResponse,
  AppApiArrayBodyParam,
} from "src/common/swagger/decorators";
import { RoleDto } from "src/roles/dto";
import { PermissionDto } from "src/permissions/dto";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.CREATE, UserModel)
  )
  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true })
  findAll(@Query() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto);
  }

  @Get("me")
  @ApiOkResponse({ type: UserDto })
  findMe(@GetUser() user: UserDto) {
    return new UserDto(user);
  }

  @Get(":id")
  @ApiOkResponse({ type: UserDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: UserDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: UserDto })
  remove(
    @Param("id", ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility
  ) {
    return this.usersService.remove(id);
  }

  @Get(":id/roles")
  @ApiOkResponse({ type: [RoleDto] })
  findRoles(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findRoles(id);
  }

  @Post("/:id/roles")
  @AppApiArrayBodyParam("roleIds", "number")
  @ApiOkResponse({ type: UserDto })
  addRoles(
    @Param("id", ParseIntPipe) id: number,
    @Body("roleIds", ParseIntPipe) roleIds: number[]
  ) {
    return this.usersService.addRoles(id, roleIds);
  }

  @Delete("/:id/roles")
  @AppApiArrayBodyParam("roleIds", "number")
  @ApiOkResponse({ type: UserDto })
  removeRoles(
    @Param("id", ParseIntPipe) id: number,
    @Body("roleIds", ParseIntPipe) roleIds: number[]
  ) {
    return this.usersService.removeRoles(id, roleIds);
  }

  @Get(":id/permissions")
  @ApiOkResponse({ type: [PermissionDto] })
  findPermissions(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findPermissions(id);
  }

  @Post(":id/permissions")
  @AppApiArrayBodyParam("permissionIds", "number")
  @ApiCreatedResponse({ type: [PermissionDto] })
  addPermissions(
    @Param("id", ParseIntPipe) id: number,
    @Body("permissionIds", new ParseArrayPipe({ items: Number }))
    permissionIds: number[]
  ) {
    return this.usersService.addPermissions(id, permissionIds);
  }

  @Delete(":id/permissions")
  @AppApiArrayBodyParam("permissionIds", "number")
  @ApiOkResponse({ type: [PermissionDto] })
  removePermissions(
    @Param("id", ParseIntPipe) id: number,
    @Body("permissionIds", new ParseArrayPipe({ items: Number }))
    permissionIds: number[]
  ) {
    return this.usersService.removePermissions(id, permissionIds);
  }
}
