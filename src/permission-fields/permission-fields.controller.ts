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
import { PermissionFieldsService } from './permission-fields.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreatePermissionFieldDto,
  UpdatePermissionFieldDto,
  PermissionFieldDto,
} from './dto';

@ApiBearerAuth()
@ApiTags('permission-fields')
@Controller('permission-fields')
export class PermissionFieldsController {
  constructor(
    private readonly permissionFieldsService: PermissionFieldsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: PermissionFieldDto })
  create(@Body() createPermissionFieldDto: CreatePermissionFieldDto) {
    return this.permissionFieldsService.create(createPermissionFieldDto);
  }

  @Get()
  @ApiOkResponse({ type: [PermissionFieldDto] })
  findAll() {
    return this.permissionFieldsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PermissionFieldDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionFieldsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PermissionFieldDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionFieldDto: UpdatePermissionFieldDto,
  ) {
    return this.permissionFieldsService.update(id, updatePermissionFieldDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PermissionFieldDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionFieldsService.remove(id);
  }
}
