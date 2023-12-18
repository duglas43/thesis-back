import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { UserEntity } from 'src/users/entities';
@Table({
  tableName: 'Address',
})
export class AddressEntity extends Model {
  @Column
  index: number;

  @Column
  city: string;

  @Column
  district: string;

  @Column
  street: string;

  @Column
  building: string;

  @BelongsTo(() => UserEntity, 'clientId')
  client: UserEntity;
}
