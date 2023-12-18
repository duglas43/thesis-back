import {
  Column,
  Model,
  Table,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserEntity } from 'src/users/entities';
import { AddressEntity } from 'src/addresses/entities';
import { MachineEntity } from 'src/machines/entities';
import { OrderMachineEntity } from './orderMachine.entity';

@Table({
  tableName: 'Order',
})
export class OrderEntity extends Model {
  @Column
  name: string;

  @Column
  comment: string;

  @Column
  statusCode: number;

  @Column
  totalPrice: number;

  @BelongsTo(() => UserEntity, 'clientId')
  client: UserEntity;

  @BelongsTo(() => UserEntity, 'responsibleId')
  responsible: UserEntity;

  @BelongsTo(() => AddressEntity, 'addressId')
  address: AddressEntity;

  @BelongsToMany(
    () => MachineEntity,
    () => OrderMachineEntity,
    'orderId',
    'machineId',
  )
  machines: MachineEntity[];
}
