import { Column, Model, Table, BelongsToMany } from "sequelize-typescript";
import { MachineModel } from "src/machines/model";
import { MachineDetailModel } from "src/machines/model";
import { DetailParamModel } from "./detail-param.model";
import { ParamModel } from "src/params/model/param.model";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Detail",
})
export class DetailModel extends AppModel<DetailModel> {
  @Column
  name: string;

  @Column
  partNumber: string;

  @BelongsToMany(
    () => MachineModel,
    () => MachineDetailModel,
    "detailId",
    "machineId"
  )
  machines: MachineModel[];

  @BelongsToMany(
    () => ParamModel,
    () => DetailParamModel,
    "detailId",
    "paramId"
  )
  params: ParamModel[];
}
