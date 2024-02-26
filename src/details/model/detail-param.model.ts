import { Column, Model, Table } from "sequelize-typescript";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "DetailParams",
})
export class DetailParamModel extends AppModel<DetailParamModel> {
  @Column
  value: string;
}
