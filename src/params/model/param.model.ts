import { Column, Model, Table, BelongsToMany } from "sequelize-typescript";
import { Types } from "../enum";
import { DetailModel } from "src/details/model";
import { DetailParamModel } from "src/details/model";

@Table({
  tableName: "Param",
})
export class ParamModel extends Model {
  @Column
  name: string;

  @Column
  unit: string;

  @Column
  type: Types;

  @BelongsToMany(
    () => DetailModel,
    () => DetailParamModel,
    "paramId",
    "detailId"
  )
  details: DetailModel[];
}
