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
import { DetailsService } from './details.service';
import {
  CreateDetailDto,
  UpdateDetailDto,
  DetailDto,
  FindDetailDto,
} from './dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import {
  CustomApiUnauthorizedResponse,
  CustomApiForbiddenResponse,
  CustomApiNotFoundResponse,
} from 'src/types';
import { CheckPolicies } from 'src/casl/decorators';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { GetAbility } from 'src/casl/decorators';
import { ACTIONS } from 'src/casl/enums';
import { DetailEntity } from './entities/detail.entity';

@ApiBearerAuth()
@CustomApiUnauthorizedResponse()
@CustomApiForbiddenResponse()
@CustomApiNotFoundResponse()
@ApiTags('details')
@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post()
  @CheckPolicies((ability) => ability.can(ACTIONS.CREATE, DetailEntity))
  @ApiCreatedResponse({ type: DetailDto })
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailsService.create(createDetailDto);
  }

  @Get()
  @ApiOkResponse({ type: DetailDto, isArray: true })
  findAll(
    @Query() findDetailDto: FindDetailDto,
    @GetAbility() ability: AppAbility,
  ) {
    return this.detailsService.findAll(findDetailDto, ability);
  }

  @Get(':id')
  @ApiOkResponse({ type: DetailDto })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.detailsService.findOne(id, ability);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DetailDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetailDto: UpdateDetailDto,
    @GetAbility() ability: AppAbility,
  ) {
    return this.detailsService.update(id, updateDetailDto, ability);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DetailDto })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.detailsService.remove(id, ability);
  }

  @Post(':id/param')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        paramId: { type: 'integer' },
        value: { type: 'string' },
      },
    },
  })
  @ApiOkResponse()
  addParam(
    @Param('id', ParseIntPipe) id: number,
    @Body('paramId', ParseIntPipe) paramId: number,
    @Body() value: string,
    @GetAbility() ability: AppAbility,
  ) {
    return this.detailsService.addParam(id, { paramId, value }, ability);
  }

  @Delete(':id/param/:paramId')
  @ApiOkResponse()
  removeParam(
    @Param('id', ParseIntPipe) id: number,
    @Param('paramId', ParseIntPipe) paramId: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.detailsService.removeParam(id, paramId, ability);
  }
}
