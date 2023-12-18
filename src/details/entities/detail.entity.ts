import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { MachineEntity } from 'src/machines/entities';
import { MachineDetailEntity } from 'src/machines/entities';
import { DetailParamEntity } from './detail-param.entity';
import { ParamEntity } from 'src/params/entities/param.entity';

@Table({
  tableName: 'Detail',
})
export class DetailEntity extends Model {
  @Column
  name: string;

  @Column
  partNumber: string;

  @BelongsToMany(
    () => MachineEntity,
    () => MachineDetailEntity,
    'detailId',
    'machineId',
  )
  machines: MachineEntity[];

  @BelongsToMany(
    () => ParamEntity,
    () => DetailParamEntity,
    'detailId',
    'paramId',
  )
  params: ParamEntity[];
}
