import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Types } from '../enums';
import { DetailEntity } from 'src/details/entities';
import { DetailParamEntity } from 'src/details/entities';

@Table({
  tableName: 'Param',
})
export class ParamEntity extends Model {
  @Column
  name: string;

  @Column
  unit: string;

  @Column
  type: Types;

  @BelongsToMany(
    () => DetailEntity,
    () => DetailParamEntity,
    'paramId',
    'detailId',
  )
  details: DetailEntity[];
}
