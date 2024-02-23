import { Column, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'Subject',
})
export class SubjectModel extends Model {
  @Column
  name: string;
}
