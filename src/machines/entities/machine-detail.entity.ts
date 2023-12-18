import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'MachineDetail',
})
export class MachineDetailEntity extends Model {
  @Column
  count: number;
}
