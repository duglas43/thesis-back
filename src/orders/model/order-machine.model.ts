import { Model, Table, Column } from "sequelize-typescript";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "OrderMachine",
})
export class OrderMachineModel extends AppModel<OrderMachineModel> {
  @Column
  count: number;
}
