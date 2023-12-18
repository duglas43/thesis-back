import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { DetailEntity } from 'src/details/entities/detail.entity';
import { MachineDetailEntity } from './machine-detail.entity';

@Table({
  tableName: 'Machine',
})
export class MachineEntity extends Model {
  @Column
  name: string;

  @Column
  partNumber: string;

  @BelongsToMany(
    () => DetailEntity,
    () => MachineDetailEntity,
    'machineId',
    'detailId',
  )
  details: DetailEntity[];
}
