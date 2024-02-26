import { Column, Model, Table } from "sequelize-typescript";
import { AppModel } from "src/common/sequelize/models";
@Table({
  tableName: "Subject",
})
export class SubjectModel extends AppModel<SubjectModel> {
  @Column
  name: string;
}
