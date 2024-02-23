import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "DetailParams",
})
export class DetailParamModel extends Model {
  @Column
  value: string;
}
