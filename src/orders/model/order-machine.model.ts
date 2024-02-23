import { Model, Table, Column } from "sequelize-typescript";

@Table({
  tableName: "OrderMachine",
})
export class OrderMachineModel extends Model {
  @Column
  count: number;
}
