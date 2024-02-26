import { Column, Model, Table, BelongsToMany } from "sequelize-typescript";
import { DetailModel } from "src/details/model/detail.model";
import { MachineDetailModel } from "./machine-detail.model";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Machine",
})
export class MachineModel extends AppModel<MachineModel> {
  @Column
  name: string;

  @Column
  partNumber: string;

  @BelongsToMany(
    () => DetailModel,
    () => MachineDetailModel,
    "machineId",
    "detailId"
  )
  details: DetailModel[];
}
