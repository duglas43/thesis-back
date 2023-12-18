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
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, RoleDto, FindRoleDto } from './dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CustomApiUnauthorizedResponse,
  CustomApiForbiddenResponse,
  CustomApiNotFoundResponse,
} from 'src/types';
import { CheckPolicies } from 'src/casl/decorators';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { ACTIONS } from 'src/casl/enums';
import { RoleEntity } from './entities/role.entity';
import { GetAbility } from 'src/casl/decorators';

@ApiBearerAuth()
@CustomApiUnauthorizedResponse()
@CustomApiForbiddenResponse()
@CustomApiNotFoundResponse()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.CREATE, RoleEntity),
  )
  @ApiCreatedResponse({ type: RoleDto })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({ type: RoleDto, isArray: true })
  findAll(
    @Query() findRoleDto: FindRoleDto,
    @GetAbility() ability: AppAbility,
  ) {
    return this.rolesService.findAll(findRoleDto, ability);
  }

  @Get(':id')
  @ApiOkResponse({ type: RoleDto })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.rolesService.findOne(id, ability);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RoleDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @GetAbility() ability: AppAbility,
  ) {
    return this.rolesService.update(id, updateRoleDto, ability);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoleDto })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.rolesService.remove(id, ability);
  }
}
