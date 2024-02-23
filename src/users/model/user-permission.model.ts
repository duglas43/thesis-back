import { Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'UserPermission',
})
export class UserPermissionModel extends Model {}
