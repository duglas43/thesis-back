import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderDto, UpdateOrderDto, OrderDto, FindOrderDto } from "./dto";
import { OrderModel } from "./model/order.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel)
    private orderEntity: typeof OrderModel
  ) {}

  async create(dto: CreateOrderDto) {
    const order = await this.orderEntity.create({ ...dto });
    return new OrderDto(order);
  }

  async findAll(dto: FindOrderDto) {
    const orders = await this.orderEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { comment: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return orders.map((order) => new OrderDto(order));
  }

  async findOne(id: number) {
    const order = await this.orderEntity.findByPkOrThrow(id);
    return new OrderDto(order);
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.orderEntity.findByPkOrThrow(id);

    await this.orderEntity.update(dto, { where: { id } });
    return new OrderDto(order);
  }

  async remove(id: number) {
    const order = await this.orderEntity.findByPkOrThrow(id);
    await order.destroy();
    return new OrderDto(order);
  }
  async addMachine(
    id: number,
    { machineId, count }: { machineId: number; count: number }
  ) {
    const order = await this.orderEntity.findByPkOrThrow(id);
    await order.$add("machines", machineId, { through: { count } });
    return new OrderDto(order);
  }

  async removeMachine(id: number, machineId: number) {
    const order = await this.orderEntity.findByPkOrThrow(id);
    await order.$remove("machines", machineId);
    return new OrderDto(order);
  }
}
