import {
  Column,
  Model,
  Table,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { UserModel } from "src/users/model";
import { AddressModel } from "src/addresses/model";
import { MachineModel } from "src/machines/model";
import { OrderMachineModel } from "./order-machine.model";

@Table({
  tableName: "Order",
})
export class OrderModel extends Model {
  @Column
  name: string;

  @Column
  comment: string;

  @Column
  statusCode: number;

  @Column
  totalPrice: number;

  @BelongsTo(() => UserModel, "clientId")
  client: UserModel;

  @BelongsTo(() => UserModel, "responsibleId")
  responsible: UserModel;

  @BelongsTo(() => AddressModel, "addressId")
  address: AddressModel;

  @BelongsToMany(
    () => MachineModel,
    () => OrderMachineModel,
    "orderId",
    "machineId"
  )
  machines: MachineModel[];
}
