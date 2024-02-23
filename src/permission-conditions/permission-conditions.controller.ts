import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionConditionsService } from './permission-conditions.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreatePermissionConditionDto,
  UpdatePermissionConditionDto,
  PermissionConditionDto,
} from './dto';

@ApiBearerAuth()
@ApiTags('permission-conditions')
@Controller('permission-conditions')
export class PermissionConditionsController {
  constructor(
    private readonly permissionConditionsService: PermissionConditionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: PermissionConditionDto })
  create(@Body() createPermissionConditionDto: CreatePermissionConditionDto) {
    return this.permissionConditionsService.create(
      createPermissionConditionDto,
    );
  }

  @Get()
  @ApiOkResponse({ type: [PermissionConditionDto] })
  findAll() {
    return this.permissionConditionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PermissionConditionDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionConditionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PermissionConditionDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionConditionDto: UpdatePermissionConditionDto,
  ) {
    return this.permissionConditionsService.update(
      id,
      updatePermissionConditionDto,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: PermissionConditionDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionConditionsService.remove(id);
  }
}
