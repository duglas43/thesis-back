import { Column, Table } from "sequelize-typescript";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Office",
})
export class OfficeModel extends AppModel<OfficeModel> {
  @Column
  name: string;

  @Column
  description: string;
}
