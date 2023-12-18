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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, FindUserDto } from './dto/';
import { UserDto } from './dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CustomApiUnauthorizedResponse,
  CustomApiForbiddenResponse,
  CustomApiNotFoundResponse,
} from 'src/types';
import { GetUser } from 'src/auth/decorator';
import { CheckPolicies } from 'src/casl/decorators';
import { ACTIONS } from 'src/casl/enums';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { GetAbility } from 'src/casl/decorators';
import { UserEntity } from './entities/user.entity';

@ApiBearerAuth()
@CustomApiUnauthorizedResponse()
@CustomApiForbiddenResponse()
@CustomApiNotFoundResponse()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.CREATE, UserEntity),
  )
  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true })
  findAll(
    @Query() findUserDto: FindUserDto,
    @GetAbility() ability: AppAbility,
  ) {
    return this.usersService.findAll(findUserDto, ability);
  }

  @Get('me')
  @ApiOkResponse({ type: UserDto })
  findMe(@GetUser() user: UserDto) {
    return new UserDto(user);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.usersService.findOne(id, ability);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetAbility() ability: AppAbility,
  ) {
    return this.usersService.update(id, updateUserDto, ability);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.usersService.remove(id, ability);
  }

  @Post('/:id/roles')
  @ApiBody({
    schema: {
      properties: {
        roleIds: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
  })
  @ApiOkResponse({ type: UserDto })
  addRoles(
    @Param('id', ParseIntPipe) id: number,
    @Body('roleIds', ParseIntPipe) roleIds: number[],
    @GetAbility() ability: AppAbility,
  ) {
    return this.usersService.addRoles(id, roleIds, ability);
  }

  @Delete('/:id/roles')
  @ApiBody({
    schema: {
      properties: {
        roleIds: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
  })
  @ApiOkResponse({ type: UserDto })
  removeRoles(
    @Param('id', ParseIntPipe) id: number,
    @Body('roleIds', ParseIntPipe) roleIds: number[],
    @GetAbility() ability: AppAbility,
  ) {
    return this.usersService.removeRoles(id, roleIds, ability);
  }
}
