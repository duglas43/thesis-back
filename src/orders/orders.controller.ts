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
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto, OrderDto, FindOrderDto } from './dto';
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
import { ACTIONS } from 'src/casl/enums';
import { OrderEntity } from './entities';
import { GetAbility } from 'src/casl/decorators/get-ability.decorator';

@ApiBearerAuth()
@CustomApiUnauthorizedResponse()
@CustomApiForbiddenResponse()
@CustomApiNotFoundResponse()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.CREATE, OrderEntity),
  )
  @ApiCreatedResponse({ type: OrderDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({ type: OrderDto, isArray: true })
  findAll(
    @Query() findOrderDto: FindOrderDto,
    @GetAbility() ability: AppAbility,
  ) {
    return this.ordersService.findAll(findOrderDto, ability);
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderDto })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.ordersService.findOne(id, ability);
  }

  @Patch(':id')
  @ApiOkResponse({ type: OrderDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @GetAbility() ability: AppAbility,
  ) {
    return this.ordersService.update(id, updateOrderDto, ability);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OrderDto })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.ordersService.remove(id, ability);
  }

  @Post(':id/machine')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { machineId: { type: 'number' }, count: { type: 'number' } },
    },
  })
  @ApiOkResponse()
  addMachine(
    @Param('id', ParseIntPipe) id: number,
    @Body('machineId', ParseIntPipe) machineId: number,
    @Body('count', ParseIntPipe) count: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.ordersService.addMachine(id, { machineId, count }, ability);
  }

  @Delete(':id/machine/:machineId')
  @ApiOkResponse()
  removeMachine(
    @Param('id', ParseIntPipe) id: number,
    @Param('machineId', ParseIntPipe) machineId: number,
    @GetAbility() ability: AppAbility,
  ) {
    return this.ordersService.removeMachine(id, machineId, ability);
  }
}
