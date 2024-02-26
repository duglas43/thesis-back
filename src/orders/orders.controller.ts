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
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto, UpdateOrderDto, OrderDto, FindOrderDto } from "./dto";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import {
  AppApiUnauthorizedResponse,
  AppApiNotFoundResponse,
  AppApiForbiddenResponse,
} from "src/common/swagger/decorators";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({ type: OrderDto, isArray: true })
  findAll(@Query() findOrderDto: FindOrderDto) {
    return this.ordersService.findAll(findOrderDto);
  }

  @Get(":id")
  @ApiOkResponse({ type: OrderDto })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: OrderDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(":id")
  @ApiOkResponse({ type: OrderDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }

  @Post(":id/machine")
  @ApiBody({
    schema: {
      type: "object",
      properties: { machineId: { type: "number" }, count: { type: "number" } },
    },
  })
  @ApiOkResponse()
  addMachine(
    @Param("id", ParseIntPipe) id: number,
    @Body("machineId", ParseIntPipe) machineId: number,
    @Body("count", ParseIntPipe) count: number
  ) {
    return this.ordersService.addMachine(id, { machineId, count });
  }

  @Delete(":id/machine/:machineId")
  @ApiOkResponse()
  removeMachine(
    @Param("id", ParseIntPipe) id: number,
    @Param("machineId", ParseIntPipe) machineId: number
  ) {
    return this.ordersService.removeMachine(id, machineId);
  }
}
