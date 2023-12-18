import { Model, Table, Column } from 'sequelize-typescript';

@Table({
  tableName: 'OrderMachine',
})
export class OrderMachineEntity extends Model {
  @Column
  count: number;
}
