import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'DetailParams',
})
export class DetailParamEntity extends Model {
  @Column
  value: string;
}
