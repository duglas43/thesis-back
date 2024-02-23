import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderDto, UpdateOrderDto, OrderDto, FindOrderDto } from "./dto";
import { OrderModel } from "./model/order.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS } from "src/casl/enum";
import { OrderMachineModel } from "./model/order-machine.model";

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

  async findAll(dto: FindOrderDto, ability: AppAbility) {
    const orders = await this.orderEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { comment: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return orders.reduce((acc, order) => {
      if (ability.can(ACTIONS.READ, order)) {
        acc.push(new OrderDto(order));
      }
      return acc;
    }, []);
  }

  async findOne(id: number, ability: AppAbility) {
    const order = await this.orderEntity.findByPk(id);
    if (!order) {
      throw new NotFoundException();
    }
    return new OrderDto(order);
  }

  async update(id: number, dto: UpdateOrderDto, ability) {
    const order = await this.orderEntity.findByPk(id);
    if (!order) {
      throw new NotFoundException();
    }
    if (!ability.can(ACTIONS.UPDATE, order)) {
      throw new ForbiddenException();
    }
    Object.keys(dto).forEach((key) => {
      if (!ability.can(ACTIONS.UPDATE, order, key)) {
        delete dto[key];
      }
    });
    await this.orderEntity.update(dto, { where: { id } });
    return new OrderDto(order);
  }

  async remove(id: number, ability: AppAbility) {
    const order = await this.orderEntity.findByPk(id);
    if (!order) {
      throw new NotFoundException();
    }
    if (!ability.can(ACTIONS.DELETE, order)) {
      throw new ForbiddenException();
    }
    await order.destroy();
    return new OrderDto(order);
  }
  async addMachine(
    id: number,
    { machineId, count }: { machineId: number; count: number },
    ability: AppAbility
  ) {
    const order = await this.orderEntity.findByPk(id);
    if (!order) {
      throw new NotFoundException();
    }
    if (!ability.can(ACTIONS.CREATE, OrderMachineModel)) {
      throw new ForbiddenException();
    }
    await order.$add("machines", machineId, { through: { count } });
    return new OrderDto(order);
  }

  async removeMachine(id: number, machineId: number, ability: AppAbility) {
    const order = await this.orderEntity.findByPk(id);
    if (!order) {
      throw new NotFoundException();
    }
    if (!ability.can(ACTIONS.DELETE, OrderMachineModel)) {
      throw new ForbiddenException();
    }
    await order.$remove("machines", machineId);
    return new OrderDto(order);
  }
}
