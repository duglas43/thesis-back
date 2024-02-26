import { Column, Model, Table } from "sequelize-typescript";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "MachineDetail",
})
export class MachineDetailModel extends AppModel<MachineDetailModel> {
  @Column
  count: number;
}
