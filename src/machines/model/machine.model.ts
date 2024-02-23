import { Column, Model, Table, BelongsToMany } from "sequelize-typescript";
import { DetailModel } from "src/details/model/detail.model";
import { MachineDetailModel } from "./machine-detail.model";

@Table({
  tableName: "Machine",
})
export class MachineModel extends Model {
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
