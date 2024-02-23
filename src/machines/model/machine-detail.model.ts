import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "MachineDetail",
})
export class MachineDetailModel extends Model {
  @Column
  count: number;
}
