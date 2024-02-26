import { Column, Model, Table, BelongsToMany } from "sequelize-typescript";
import { Types } from "../enum";
import { DetailModel } from "src/details/model";
import { DetailParamModel } from "src/details/model";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Param",
})
export class ParamModel extends AppModel<ParamModel> {
  @Column
  name: string;

  @Column
  unit: string;

  @Column
  type: string;

  @BelongsToMany(
    () => DetailModel,
    () => DetailParamModel,
    "paramId",
    "detailId"
  )
  details: DetailModel[];
}
